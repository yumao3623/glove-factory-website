export function PlaceholderVisual({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden border border-border bg-muted ${className}`} aria-label={label} role="img">
    <div className="absolute inset-[12%] border border-border" />
    <span className="relative max-w-40 text-center text-xs font-medium leading-5 text-muted-foreground">{label}</span>
  </div>;
}
