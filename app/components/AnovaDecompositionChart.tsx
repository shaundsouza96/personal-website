"use client";

const BARS = [
  { label: "Total variation", pct: 1.0, color: "var(--foreground)", opacity: 0.18 },
  { label: "Treatment variation", pct: 0.65, color: "var(--accent)", opacity: 0.7 },
  { label: "Random error", pct: 0.35, color: "var(--muted)", opacity: 0.45 },
];

export default function AnovaDecompositionChart() {
  const W = 560;
  const H = 200;
  const labelW = 172;
  const barLeft = labelW + 12;
  const barMaxW = W - barLeft - 60;
  const rowH = 44;
  const barH = 22;
  const startY = 28;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {BARS.map((bar, i) => {
        const y = startY + i * rowH;
        const bw = bar.pct * barMaxW;
        return (
          <g key={i}>
            <text
              x={labelW}
              y={y + barH / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={12}
              fill="var(--foreground)"
            >
              {bar.label}
            </text>
            <rect
              x={barLeft}
              y={y}
              width={bw}
              height={barH}
              rx={3}
              fill={bar.color}
              opacity={bar.opacity}
            />
            {i === 1 && (
              <text
                x={barLeft + bw + 8}
                y={y + barH / 2}
                dominantBaseline="middle"
                fontSize={10}
                fill="var(--accent)"
              >
                65%
              </text>
            )}
            {i === 2 && (
              <text
                x={barLeft + bw + 8}
                y={y + barH / 2}
                dominantBaseline="middle"
                fontSize={10}
                fill="var(--muted)"
              >
                35%
              </text>
            )}
          </g>
        );
      })}

      {/* Sum indicator */}
      <line
        x1={barLeft + BARS[1].pct * barMaxW}
        y1={startY + rowH + barH}
        x2={barLeft + BARS[1].pct * barMaxW}
        y2={startY + 2 * rowH}
        stroke="var(--border)"
        strokeWidth={1}
        strokeDasharray="3 2"
      />

      {/* Equation */}
      <text
        x={W / 2}
        y={H - 14}
        textAnchor="middle"
        fontSize={11}
        fill="var(--muted)"
      >
        Total SS = Treatment SS + Error SS
      </text>

      {/* ANOVA question */}
      <text
        x={W / 2}
        y={H - 1}
        textAnchor="middle"
        fontSize={10}
        fill="var(--muted)"
      >
        ANOVA asks: is Treatment SS large relative to Error SS?
      </text>
    </svg>
  );
}
