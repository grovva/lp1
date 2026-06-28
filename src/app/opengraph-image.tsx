import { ImageResponse } from "next/og";

export const alt = "Grovva — Marketing e Tecnologia Sob Medida para Clínicas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 78% 22%, rgba(86,194,113,0.35) 0%, rgba(10,10,10,0) 45%), radial-gradient(circle at 18% 88%, rgba(86,194,113,0.14) 0%, rgba(10,10,10,0) 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 44 }}>
          <span
            style={{
              fontSize: 116,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-5px",
            }}
          >
            grovva
          </span>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 22,
              backgroundColor: "#56C271",
              marginLeft: 8,
              marginBottom: 24,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 54,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.15,
            maxWidth: 920,
            letterSpacing: "-1px",
          }}
        >
          Marketing e tecnologia sob medida para clínicas
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 38,
            fontSize: 30,
            color: "#B5B5B5",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Atraia pacientes, aumente o faturamento e cresça sem depender de
          indicação.
        </div>
      </div>
    ),
    { ...size },
  );
}
