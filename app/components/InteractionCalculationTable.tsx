"use client";
import { useState } from "react";
import { segmentColors } from "./CATEChart";

function Formula({ T, S }: { T: 0 | 1; S: 0 | 1 }) {
  const term = (content: string, active: boolean) =>
    active
      ? <span style={{ fontStyle: "italic" }}>{content}</span>
      : <s style={{ opacity: 0.22, fontStyle: "italic", textDecorationThickness: "1.5px" }}>{content}</s>;

  return (
    <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "0.95rem" }}>
      Y = <span style={{ fontStyle: "italic" }}>β₀</span>
      {" + "}{term("β₁T", T === 1)}
      {" + "}{term("β₂S", S === 1)}
      {" + "}{term("β₃(T×S)", T === 1 && S === 1)}
    </span>
  );
}

function MiniChart({ hoveredCell }: { hoveredCell: string | null }) {
  const muted = "#66645f";
  const grid  = "#d9d8d2";

  const ctrlX      = 155;
  const testX      = 470;
  const axisBottom = 430;
  const gridYs     = [168, 253, 338];

  // Key: "${T}${S}"
  const segments = [
    { label: "Power Users",    color: segmentColors.power,    y1: 195, y2: 105, ctrlKey: "01", testKey: "11" },
    { label: "Inactive Users", color: segmentColors.inactive, y1: 248, y2: 338, ctrlKey: "00", testKey: "10" },
  ];

  const anyHovered = hoveredCell !== null;

  return (
    <svg
      viewBox="0 60 680 415"
      width="100%"
      aria-label="Interaction model chart"
      style={{ display: "block" }}
    >
      {gridYs.map((y) => (
        <line key={y} x1={ctrlX} y1={y} x2={testX} y2={y} stroke={grid} strokeWidth={0.5} />
      ))}

      {segments.map(({ label, color, y1, y2, ctrlKey, testKey }) => {
        const ctrlActive = hoveredCell === ctrlKey;
        const testActive = hoveredCell === testKey;

        return (
          <g key={label}>
            <line
              x1={ctrlX} y1={y1} x2={testX} y2={y2}
              stroke={color} strokeWidth={3} strokeLinecap="round"
              opacity={anyHovered ? 0.3 : 1}
              style={{ transition: "opacity 0.15s ease" }}
            />
            <text
              x={testX + 14} y={y2 + 5}
              fill={color} fontSize={13}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontWeight="600"
              opacity={anyHovered ? 0.3 : 1}
              style={{ transition: "opacity 0.15s ease" }}
            >
              {label}
            </text>

            {/* Control endpoint */}
            {ctrlActive && (
              <circle cx={ctrlX} cy={y1} r={18} fill={color} opacity={0.12} />
            )}
            <circle
              cx={ctrlX} cy={y1}
              r={ctrlActive ? 9 : 5}
              fill={color}
              opacity={anyHovered && !ctrlActive ? 0.2 : 1}
              style={{ transition: "opacity 0.15s ease" }}
            />

            {/* Test endpoint */}
            {testActive && (
              <circle cx={testX} cy={y2} r={18} fill={color} opacity={0.12} />
            )}
            <circle
              cx={testX} cy={y2}
              r={testActive ? 9 : 5}
              fill={color}
              opacity={anyHovered && !testActive ? 0.2 : 1}
              style={{ transition: "opacity 0.15s ease" }}
            />
          </g>
        );
      })}

      <text x={ctrlX} y={axisBottom + 24} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize={13} fill={muted}>Control</text>
      <text x={testX}  y={axisBottom + 24} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize={13} fill={muted}>Test</text>
    </svg>
  );
}

export default function InteractionCalculationTable() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const coeffs = [
    { label: "β₀ = 40%", title: "Inactive control mean" },
    { label: "β₁ = −5%",  title: "Inactive treatment effect" },
    { label: "β₂ = +20%", title: "Power Users baseline lift" },
    { label: "β₃ = +20%", title: "Difference in treatment effects" },
  ];

  const cells: { T: 0 | 1; S: 0 | 1; result: string; color: string }[] = [
    { T: 0, S: 0, result: "= 40%", color: segmentColors.inactive },
    { T: 0, S: 1, result: "= 60%", color: segmentColors.power    },
    { T: 1, S: 0, result: "= 35%", color: segmentColors.inactive },
    { T: 1, S: 1, result: "= 75%", color: segmentColors.power    },
  ];

  return (
    <div className="calcWrap">
      {/* Interactive chart */}
      <MiniChart hoveredCell={hoveredCell} />

      {/* Fitted coefficients strip */}
      <div className="calcCoeffs">
        {coeffs.map(({ label, title }) => (
          <div key={label} className="calcCoeff" title={title}>{label}</div>
        ))}
      </div>

      {/* 2×2 grid */}
      <div className="calcGrid">
        <div className="calcCorner" />
        <div className="calcColLabel" style={{ color: segmentColors.inactive }}>
          Inactive Users<br /><span style={{ fontWeight: 400, fontSize: "0.8rem", color: "var(--muted)" }}>S = 0</span>
        </div>
        <div className="calcColLabel" style={{ color: segmentColors.power }}>
          Power Users<br /><span style={{ fontWeight: 400, fontSize: "0.8rem", color: "var(--muted)" }}>S = 1</span>
        </div>

        <div className="calcRowLabel">Control<br /><span style={{ fontSize: "0.8rem" }}>T = 0</span></div>
        {cells.slice(0, 2).map(({ T, S, result, color }) => {
          const key = `${T}${S}`;
          return (
            <div
              key={key}
              className="calcCell"
              style={{ cursor: "default", background: hoveredCell === key ? "var(--soft)" : undefined }}
              onMouseEnter={() => setHoveredCell(key)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              <div className="calcSubst"><Formula T={T} S={S} /></div>
              <div className="calcSubst">
                <strong style={{ color, fontStyle: "italic", fontFamily: "Georgia, 'Times New Roman', serif" }}>{result}</strong>
              </div>
            </div>
          );
        })}

        <div className="calcRowLabel">Test<br /><span style={{ fontSize: "0.8rem" }}>T = 1</span></div>
        {cells.slice(2, 4).map(({ T, S, result, color }) => {
          const key = `${T}${S}`;
          return (
            <div
              key={key}
              className="calcCell"
              style={{ cursor: "default", background: hoveredCell === key ? "var(--soft)" : undefined }}
              onMouseEnter={() => setHoveredCell(key)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              <div className="calcSubst"><Formula T={T} S={S} /></div>
              <div className="calcSubst">
                <strong style={{ color, fontStyle: "italic", fontFamily: "Georgia, 'Times New Roman', serif" }}>{result}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* CATE derivation */}
      <div className="calcCATEs">
        <span style={{ color: segmentColors.inactive }}>CATE(Inactive) = β₁ = −5%</span>
        <span style={{ color: segmentColors.power }}>CATE(Power) = β₁ + β₃ = −5 + 20 = +15%</span>
        <span style={{ color: "var(--muted)" }}>β₃ = difference in CATEs = +20%</span>
      </div>
    </div>
  );
}
