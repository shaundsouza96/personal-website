"use client";

// originalCx matches the hardcoded x-coordinates in hatPath
const FIGURES = [
  {
    label: "King",
    hatPath: [
      "M 668 132 L 668 100 L 680 80 L 690 108 L 700 70 L 710 108 L 720 80 L 730 100 L 730 132 Z",
    ],
    hatFill: "#f5c842",
    hatStroke: "var(--foreground)",
    decoration: "M 672 116 L 726 116",
    originalCx: 700,
  },
  {
    label: "Priest",
    hatPath: [
      "M 100 130 L 88 130 L 82 110 L 94 60 L 106 60 L 118 110 L 112 130 Z",
      "M 86 110 L 114 110",
    ],
    hatFill: "#c8b8f5",
    hatStroke: "var(--foreground)",
    decoration: "M 94 85 L 106 85 M 100 78 L 100 92",
    originalCx: 100,
  },
  {
    label: "Scholar",
    hatPath: [
      "M 460 100 L 500 82 L 540 100 L 500 118 Z",
      "M 487 100 L 487 130 L 500 130 L 513 130 L 513 100",
      "M 500 82 L 500 76",
      "M 500 76 L 516 68",
    ],
    hatFill: "#2a2a2a",
    hatStroke: "var(--foreground)",
    decoration: "M 516 68 L 522 76",
    originalCx: 500,
  },
];

function Figure({ cx, label, hatPaths, hatFill, hatStroke, decoration }: {
  cx: number;
  label: string;
  hatPaths: string[];
  hatFill: string;
  hatStroke: string;
  decoration: string;
}) {
  return (
    <g>
      {hatPaths.map((d, i) => (
        <path key={i} d={d} fill={i === 0 ? hatFill : "none"} stroke={hatStroke} strokeWidth={1.5} />
      ))}
      {decoration && <path d={decoration} fill="none" stroke={hatStroke} strokeWidth={1.5} />}
      <circle cx={cx} cy={148} r={14} fill="var(--soft-bg)" stroke="var(--foreground)" strokeWidth={1.5} />
      <line x1={cx} y1={162} x2={cx} y2={210} stroke="var(--foreground)" strokeWidth={2} />
      <line x1={cx - 22} y1={178} x2={cx + 22} y2={178} stroke="var(--foreground)" strokeWidth={2} />
      <line x1={cx} y1={210} x2={cx - 14} y2={240} stroke="var(--foreground)" strokeWidth={2} />
      <line x1={cx} y1={210} x2={cx + 14} y2={240} stroke="var(--foreground)" strokeWidth={2} />
      <text x={cx} y={258} textAnchor="middle" fontSize={12} fill="var(--muted)" fontFamily="var(--font-sans)">
        {label}
      </text>
    </g>
  );
}

const NEW_CENTERS = [200, 400, 600];

export default function AuthorityFiguresViz() {
  const H = 280;

  return (
    <svg
      viewBox={`140 0 520 ${H}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      aria-label="Three authority figures: king, priest, scholar"
    >
      {FIGURES.map((fig, i) => {
        const dx = NEW_CENTERS[i] - fig.originalCx;
        return (
          <g key={fig.label} transform={`translate(${dx}, 0)`}>
            <Figure
              cx={fig.originalCx}
              label={fig.label}
              hatPaths={fig.hatPath}
              hatFill={fig.hatFill}
              hatStroke={fig.hatStroke}
              decoration={fig.decoration}
            />
          </g>
        );
      })}
    </svg>
  );
}
