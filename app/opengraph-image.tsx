import { ImageResponse } from "next/og";

export const alt = "JS Meilai occasion gloves and bridal accessories manufacturer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#e7e9e8",
        color: "#0d2b3f",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>JS Meilai · Glove manufacturer</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 600, lineHeight: 1.05 }}>Occasion Gloves &amp; Wedding Veils</div>
        <div style={{ display: "flex", fontSize: 34, color: "#3e464b" }}>Wholesale, OEM and sourcing conversations</div>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#5c676d" }}>www.jsmeilai.com</div>
    </div>,
    { ...size },
  );
}
