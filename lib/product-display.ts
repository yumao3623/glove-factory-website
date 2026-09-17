import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";

export const familyLabels: Record<ApprovedCatalogueProduct["productFamily"], string> = {
  "bridal-gloves": "Bridal｜Wedding gloves",
  "opera-gloves": "Opera｜Evening gloves",
  "costume-gloves": "Costume｜Stage gloves",
  "kids-dress-gloves": "Kids｜Girls dress gloves",
  "wedding-veils": "Wedding｜Bridal veils",
  "arm-sleeves": "Arm sleeves｜Occasion accessories",
};

const materialMap: Record<string, string> = { satin: "Satin", silk: "Silk", lace: "Lace", tulle: "Tulle", velvet: "Velvet", cotton: "Cotton", mesh: "Mesh" };
const colorMap: Record<string, string> = { white: "White", black: "Black", ivory: "Ivory", champagne: "Champagne", pink: "Pink", red: "Red", blue: "Blue", purple: "Purple", brown: "Brown", gold: "Gold", silver: "Silver", green: "Green", "白色": "White", "白色缎面": "White", "白色网格蕾丝": "White", "红/黑/白/粉色": "Red, Black, White, Pink", "黑/白": "Black, White", "黑/紫/香槟色": "Black, Purple, Champagne", "黑白": "Black, White", "黑网纱": "Black", "黑色": "Black", "黑色头纱": "Black", "黑色蕾丝": "Black" };
function normalize(value: string) { return value.trim().toLowerCase().replace(/[|_/]+/g, " ").replace(/\s+/g, " "); }
export function displayMaterial(product: ApprovedCatalogueProduct) { const value = product.material.status === "CONFIRMED" ? product.material.value : null; return value ? materialMap[normalize(value)] ?? value.replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Material on request"; }
export function displayColors(product: ApprovedCatalogueProduct) { const values = product.color?.status === "CONFIRMED" ? product.color.value ?? [] : []; return values.flatMap((value) => { const mapped = colorMap[value] ?? colorMap[normalize(value)]; return mapped ? mapped.split(", ") : [value.replace(/\b\w/g, (letter) => letter.toUpperCase())]; }); }
export function displayLength(product: ApprovedCatalogueProduct) { if (product.length?.status !== "CONFIRMED" || !product.length.value) return "Length on request"; return product.length.value.label; }
export function displayFingerStyle(product: ApprovedCatalogueProduct) { const value = product.fingerStyle?.status === "CONFIRMED" ? product.fingerStyle.value : null; return value === "full-finger" ? "Full finger" : value === "fingerless" ? "Fingerless" : value === "half-finger" ? "Half finger" : "Finger style on request"; }
export function displayFamily(product: ApprovedCatalogueProduct) { return familyLabels[product.productFamily]; }
export function displayMeta(product: ApprovedCatalogueProduct) { return [displayMaterial(product), displayLength(product)].filter(Boolean).join(" · "); }
