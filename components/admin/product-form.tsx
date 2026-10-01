"use client";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

type Spec = { value: string | number | boolean | string[] | null; status: "CONFIRMED" | "PENDING_CONFIRMATION" | "UNKNOWN" | "NOT_APPLICABLE"; source: string };
type Product = { specifications?: Record<string, Spec>; id: string; slug: string; name: string; family: string; material: string | null; length_cm: number | null; finger_style: string | null; colors: string[]; description: string | null; image_urls: string[]; sub_style?: string[]; occasion?: string[]; decoration?: string[]; age_group?: string | null; customizable_fields?: string[]; featured?: boolean; sort_order?: number; status: "draft" | "active" | "archived" };
const empty = { slug: "", name: "", family: "bridal-gloves", material: "", length_cm: null as number | null, finger_style: "", colors: "", sub_style: "", occasion: "", decoration: "", age_group: "", customizable_fields: "", specifications: {} as Record<string, Spec>, description: "", image_urls: [] as string[], featured: false, sort_order: 9999 };
const inputClass = "mt-1 w-full border border-stone-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0d2b3f]";
const families = ["bridal-gloves", "opera-gloves", "costume-gloves", "kids-dress-gloves", "wedding-veils", "arm-sleeves"];
const familyLabels: Record<string, string> = { "bridal-gloves": "新娘手套", "opera-gloves": "歌剧手套", "costume-gloves": "舞台与礼服手套", "kids-dress-gloves": "儿童礼服手套", "wedding-veils": "婚礼头纱", "arm-sleeves": "臂套" };
const statusLabels: Record<Product["status"], string> = { active: "已发布", draft: "草稿", archived: "已归档" };
const fingerStyleLabels: Record<string, string> = { "full-finger": "包指", fingerless: "露指", "half-finger": "半指", "not-applicable": "不适用" };
const ageGroupLabels: Record<string, string> = { adult: "成人", kids: "儿童", mixed: "混合" };
const preview = (path: string) => `/api/admin/media/preview/?path=${encodeURIComponent(path)}`;

export function ProductForm() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [editing, setEditing] = useState<Product | null>(null);
  const [review, setReview] = useState<Product | null>(null);
  const [reviewed, setReviewed] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key: string, value: unknown) => setForm(current => ({ ...current, [key]: value }));
  async function load() {
    const response = await fetch("/api/admin/products/", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error("无法加载产品，请检查管理员会话。");
    setItems(Array.isArray(data.data) ? data.data : []);
  }
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/products/", { cache: "no-store", signal: controller.signal })
      .then(async response => { const data = await response.json(); if (!response.ok) throw new Error("无法加载产品，请检查管理员会话。"); return data; })
      .then(data => setItems(Array.isArray(data.data) ? data.data : []))
      .catch(() => { if (!controller.signal.aborted) setMessage("无法加载产品，请检查管理员会话。"); });
    return () => controller.abort();
  }, []);
  function edit(product: Product) {
    setEditing(product);
    setForm({ slug: product.slug, name: product.name, family: product.family, material: product.material ?? "", length_cm: product.length_cm, finger_style: product.finger_style ?? "", colors: (product.colors ?? []).join(", "), sub_style: (product.sub_style ?? []).join(", "), occasion: (product.occasion ?? []).join(", "), decoration: (product.decoration ?? []).join(", "), age_group: product.age_group ?? "", customizable_fields: (product.customizable_fields ?? []).join(", "), specifications: product.specifications ?? {}, description: product.description ?? "", image_urls: product.image_urls ?? [], featured: product.featured ?? false, sort_order: product.sort_order ?? 9999 });
    setReview(null); setReviewed(false); setMessage(""); document.getElementById("product-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch(editing ? `/api/admin/products/${editing.id}/` : "/api/admin/products/", { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, ...Object.fromEntries(["colors", "sub_style", "occasion", "decoration", "customizable_fields"].map(key => [key, String(form[key as keyof typeof form]).split(",").map(value => value.trim()).filter(Boolean)])), status: "draft" }) });
      await response.json();
      if (!response.ok) throw new Error("无法保存产品，请检查内容后重试。");
      setEditing(null); setForm({ ...empty }); setReview(null);
      await load(); window.dispatchEvent(new Event("jsmeilai:products-updated"));
      setMessage("草稿已保存，请在发布前复核详情。");
    } catch { setMessage("无法保存产品，请检查内容后重试。"); }
    finally { setBusy(false); }
  }
  async function upload(file: File) {
    setBusy(true); setMessage("");
    try {
      const body = new FormData(); body.set("file", file);
      const response = await fetch("/api/admin/media/", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error("图片上传失败，请重试。");
      setForm(current => ({ ...current, image_urls: [...current.image_urls, data.path] }));
      setMessage("图片已上传，请保存草稿以关联图片。");
    } catch { setMessage("图片上传失败，请重试。"); }
    finally { setBusy(false); }
  }
  async function publish() {
    if (!review || !reviewed) return;
    setBusy(true); setMessage("");
    try {
      const response = await fetch(`/api/admin/products/${review.id}/publish/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reviewed: true }) });
      await response.json();
      if (!response.ok) throw new Error("无法发布产品，请检查内容后重试。");
      setReview(null); setReviewed(false); await load(); setMessage("产品已发布到目录。");
    } catch { setMessage("无法发布产品，请检查内容后重试。"); }
    finally { setBusy(false); }
  }
  async function archive(product: Product) {
    setBusy(true);
    try { const response = await fetch(`/api/admin/products/${product.id}/`, { method: "DELETE" }); if (!response.ok) throw new Error("无法归档产品。"); await load(); setMessage("产品已归档，可编辑后恢复为草稿。"); }
    catch { setMessage("无法归档产品，请检查内容后重试。"); }
    finally { setBusy(false); }
  }
  return <div className="mt-10">
    {message && <p role="status" className="mb-5 border-l-2 border-[#0d2b3f] bg-stone-100 p-4 text-sm text-stone-700">{message}</p>}
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <form id="product-editor" onSubmit={submit} className="grid scroll-mt-24 content-start gap-4 border border-stone-200 bg-white p-6">
        <div className="flex justify-between gap-4"><div><p className="section-label text-stone-500">{editing ? "编辑产品" : "新建草稿"}</p><h2 className="mt-2 font-serif text-3xl text-[#0d2b3f]">产品详情</h2></div>{editing && <button type="button" onClick={() => { setEditing(null); setForm({ ...empty }); }} className="self-start text-xs underline">取消</button>}</div>
        {editing?.status === "active" && <p className="text-sm text-stone-600">保存后产品会回到草稿状态，重新发布后才会对外显示。</p>}
        {([['name', '产品名称'], ['slug', 'URL 标识'], ['material', '材质']] as const).map(([key, label]) => <label key={key} className="text-sm">{label}<input required={key !== 'material'} value={form[key]} onChange={event => set(key, event.target.value)} className={inputClass} /></label>)}
        <label className="text-sm">产品系列<select value={form.family} onChange={event => set("family", event.target.value)} className={inputClass}>{families.map(family => <option key={family} value={family}>{familyLabels[family]}</option>)}</select></label>
        <label className="text-sm">手指款式<select value={form.finger_style} onChange={event => set("finger_style", event.target.value)} className={inputClass}>{["", "full-finger", "fingerless", "half-finger", "not-applicable"].map(style => <option key={style} value={style}>{fingerStyleLabels[style] ?? "待确认"}</option>)}</select></label>
        <label className="text-sm">长度（厘米）<input type="number" min="0" max="300" value={form.length_cm ?? ""} onChange={event => set("length_cm", event.target.value ? Number(event.target.value) : null)} className={inputClass} /></label>
        <label className="text-sm">颜色（用逗号分隔）<input value={form.colors} onChange={event => set("colors", event.target.value)} className={inputClass} /></label>
        {([['sub_style', '款式标签'], ['occasion', '适用场合'], ['decoration', '装饰'], ['customizable_fields', '可定制字段']] as const).map(([key, label]) => <label key={key} className="text-sm">{label}<input value={form[key]} onChange={event => set(key, event.target.value)} className={inputClass} placeholder="用逗号分隔多个值" /></label>)}
        <label className="text-sm">年龄段<select value={form.age_group} onChange={event => set("age_group", event.target.value)} className={inputClass}>{["", "adult", "kids", "mixed"].map(value => <option key={value} value={value}>{ageGroupLabels[value] ?? "待确认"}</option>)}</select></label>
        <details className="border-y border-stone-200 py-4"><summary className="cursor-pointer text-sm font-medium">尺码、MOQ、样品与交期</summary><p className="mt-3 text-xs leading-6 text-stone-500">留空内容按需确认；只有工厂核实后才能标记为已确认。</p><div className="mt-4 grid gap-4">{[["Available sizes", "可供尺码"], ["MOQ", "MOQ"], ["Sample policy", "样品安排"], ["Production lead time", "生产交期"], ["Packaging", "包装"], ["Care instructions", "护理说明"], ["Customisation", "定制内容"]].map(([key, label]) => <div key={label}><label className="text-sm">{label}<input value={String(form.specifications[key]?.value ?? "")} onChange={event => set("specifications", { ...form.specifications, [key]: { value: event.target.value, status: form.specifications[key]?.status ?? "PENDING_CONFIRMATION", source: "admin:factory-review" } })} className={inputClass} /></label><select aria-label={`${label}确认状态`} value={form.specifications[key]?.status ?? "PENDING_CONFIRMATION"} onChange={event => set("specifications", { ...form.specifications, [key]: { value: form.specifications[key]?.value ?? "", status: event.target.value, source: "admin:factory-review" } })} className="mt-2 min-h-10 w-full border border-stone-300 px-2 text-xs"><option value="PENDING_CONFIRMATION">待工厂确认</option><option value="CONFIRMED">已确认，可发布</option><option value="UNKNOWN">未知</option><option value="NOT_APPLICABLE">不适用</option></select></div>)}</div></details>
        <label className="text-sm">产品描述<textarea rows={4} value={form.description} onChange={event => set("description", event.target.value)} className={inputClass} /></label>
        <div className="grid gap-3 sm:grid-cols-2"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={event => set("featured", event.target.checked)} />在目录中推荐</label><label className="text-sm">排序值<input type="number" min="0" step="1" value={form.sort_order} onChange={event => set("sort_order", Number(event.target.value))} className={inputClass} /></label></div>
        <div className="text-sm"><p>产品图片</p><p className="mt-1 text-xs text-stone-500">支持 JPEG、PNG 或 WebP，单张最大 5 MB。</p><label className="mt-3 inline-flex min-h-11 cursor-pointer items-center border border-stone-300 px-4 has-[:focus-visible]:ring-2 has-[:disabled]:opacity-50"><input aria-label="上传产品图片" disabled={busy} type="file" accept="image/jpeg,image/png,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file); event.target.value = ""; }} className="sr-only" /><span>选择图片</span></label><p className="mt-2 text-xs text-stone-500">{form.image_urls.length} 张图片已附加到此草稿</p></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{form.image_urls.map((path, index) => <div key={path}><a href={preview(path)} target="_blank" rel="noreferrer" className="relative block aspect-[4/5] bg-stone-100"><Image src={preview(path)} alt="产品草稿图片" fill unoptimized className="object-contain" /></a><p className="mt-2 text-xs text-stone-500">{index === 0 ? "封面图" : `图片 ${index + 1}`}</p>{index > 0 && <button type="button" onClick={() => set("image_urls", [path, ...form.image_urls.filter(value => value !== path)])} className="block min-h-10 text-xs underline">设为封面</button>}<button type="button" onClick={() => set("image_urls", form.image_urls.filter(value => value !== path))} className="mt-2 text-xs underline">从草稿移除</button></div>)}</div>
        <button disabled={busy} className="w-fit bg-[#0d2b3f] px-5 py-3 text-sm text-white disabled:opacity-50">{busy ? "请稍候…" : "保存草稿"}</button>
      </form>
      <section><div className="flex items-end justify-between border-b border-stone-300 pb-4"><h2 className="font-serif text-3xl text-[#0d2b3f]">产品目录</h2><span className="text-sm text-stone-500">{items.length} 个产品</span></div>
        {review && <div className="my-5 border border-stone-300 bg-stone-50 p-5"><h3 className="font-serif text-2xl">复核： {review.name}</h3><p className="mt-3 text-sm leading-6">{review.description || "发布前请补充产品描述。"}</p><p className="mt-2 text-sm text-stone-600">{familyLabels[review.family] ?? review.family} · {review.material || "材质待确认"} · {review.image_urls.length} 张图片</p><div className="mt-4 flex gap-2 overflow-x-auto">{review.image_urls.map(path => <a key={path} href={preview(path)} target="_blank" rel="noreferrer" className="relative block h-24 w-20 shrink-0 bg-white"><Image src={preview(path)} alt={review.name} fill unoptimized className="object-contain" /></a>)}</div><label className="mt-4 flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={reviewed} onChange={event => setReviewed(event.target.checked)} className="mt-1" />我已复核详情，并确认拥有这些图片的使用权限。</label><button type="button" disabled={!reviewed || busy} onClick={() => void publish()} className="mt-4 bg-[#0d2b3f] px-4 py-3 text-sm text-white disabled:opacity-50">发布产品</button></div>}
        <div className="my-5 grid gap-3 sm:grid-cols-2"><label className="text-sm">查找产品<input value={search} onChange={event => setSearch(event.target.value)} placeholder="名称、URL 标识或系列" className={inputClass} /></label><label className="text-sm">发布状态<select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} className={inputClass}>{["all", "active", "draft", "archived"].map(status => <option key={status} value={status}>{status === "all" ? "全部产品" : statusLabels[status as Product["status"]]}</option>)}</select></label></div><div className="divide-y divide-stone-200">{items.filter(product => (statusFilter === "all" || product.status === statusFilter) && `${product.name} ${product.slug} ${product.family}`.toLowerCase().includes(search.toLowerCase())).map(product => <article key={product.id} className="py-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-serif text-xl text-[#0d2b3f]">{product.name}</h3><p className="mt-1 text-xs tracking-wide text-stone-500">{familyLabels[product.family] ?? product.family} · {statusLabels[product.status]}</p></div><button type="button" disabled={busy} onClick={() => edit(product)} className="border border-[#0d2b3f] px-3 py-2 text-xs">编辑</button></div><div className="mt-3 flex flex-wrap gap-4 text-xs">{product.status === "draft" && <button type="button" onClick={() => { setReview(product); setReviewed(false); }} className="underline">复核并发布</button>}{product.status === "active" && <a href={`/products/${product.slug}/`} className="underline">查看产品</a>}{product.status !== "archived" && <button type="button" disabled={busy} onClick={() => void archive(product)} className="text-stone-500 underline">归档</button>}</div></article>)}{!items.length && <p className="py-12 text-sm text-stone-600">暂无产品，请先保存一份草稿。</p>}</div>
      </section>
    </div>
  </div>;
}
