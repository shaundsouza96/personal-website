"use client";

const BLOCKS = ["Block I", "Block II", "Block III"];
const R = 10;

export default function BlockingDiagram() {
  const W = 560;
  const H = 200;
  const startY = 36;
  const rowH = 52;
  const ctrlX = 200;
  const trtX = 280;
  const bracketX = 320;
  const labelX = 60;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Column headers */}
      <text x={ctrlX} y={18} textAnchor="middle" fontSize={11} fill="var(--muted)">Control</text>
      <text x={trtX} y={18} textAnchor="middle" fontSize={11} fill="var(--muted)">Treated</text>

      {BLOCKS.map((label, i) => {
        const cy = startY + i * rowH;
        return (
          <g key={i}>
            {/* Block label */}
            <text x={labelX} y={cy + 4} textAnchor="middle" dominantBaseline="middle" fontSize={12} fill="var(--foreground)">
              {label}
            </text>

            {/* Control unit */}
            <circle cx={ctrlX} cy={cy} r={R} fill="var(--panel)" stroke="var(--muted)" strokeWidth={1.5} />

            {/* Treated unit */}
            <circle cx={trtX} cy={cy} r={R} fill="var(--accent)" opacity={0.7} />

            {/* Connector line within block */}
            <line
              x1={ctrlX + R} y1={cy}
              x2={trtX - R} y2={cy}
              stroke="var(--border)" strokeWidth={1} strokeDasharray="3 2"
            />

            {/* Bracket */}
            <line x1={bracketX} y1={cy - R} x2={bracketX + 8} y2={cy - R} stroke="var(--muted)" strokeWidth={1} />
            <line x1={bracketX + 8} y1={cy - R} x2={bracketX + 8} y2={cy + R} stroke="var(--muted)" strokeWidth={1} />
            <line x1={bracketX} y1={cy + R} x2={bracketX + 8} y2={cy + R} stroke="var(--muted)" strokeWidth={1} />
            <text x={bracketX + 14} y={cy + 4} dominantBaseline="middle" fontSize={10} fill="var(--muted)">
              compare within
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <circle cx={100} cy={H - 16} r={6} fill="var(--panel)" stroke="var(--muted)" strokeWidth={1.5} />
      <text x={112} y={H - 12} fontSize={10} fill="var(--muted)">Control</text>
      <circle cx={160} cy={H - 16} r={6} fill="var(--accent)" opacity={0.7} />
      <text x={172} y={H - 12} fontSize={10} fill="var(--muted)">Treated</text>
    </svg>
  );
}
