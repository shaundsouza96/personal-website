"use client";

const JITTER_1 = [0, 0];
const JITTER_5 = [-0.6, -0.2, 0.1, 0.5, -0.4];
const R = 8;

export default function ReplicationDiagram() {
  const W = 560;
  const H = 200;
  const midX = W / 2;
  const panelW = midX - 20;

  const ctrlX1 = 100;
  const trtX1 = 170;
  const ctrlX5 = midX + 80;
  const trtX5 = midX + 200;
  const dotY = H / 2;
  const spread = 18;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Divider */}
      <line x1={midX} y1={20} x2={midX} y2={H - 20} stroke="var(--border)" strokeWidth={1} />

      {/* Panel labels */}
      <text x={panelW / 2} y={22} textAnchor="middle" fontSize={11} fill="var(--muted)">
        n = 1 per group
      </text>
      <text x={midX + panelW / 2} y={22} textAnchor="middle" fontSize={11} fill="var(--muted)">
        n = 5 per group
      </text>

      {/* n=1 panel — single dots */}
      {[ctrlX1, trtX1].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={dotY} r={R} fill={i === 0 ? "var(--muted)" : "var(--accent)"} opacity={0.6} />
          <text x={cx} y={dotY + R + 16} textAnchor="middle" fontSize={11} fill="var(--muted)">
            {i === 0 ? "Control" : "Treated"}
          </text>
        </g>
      ))}
      <text x={(ctrlX1 + trtX1) / 2} y={H - 20} textAnchor="middle" fontSize={10} fill="var(--muted)">
        Can&apos;t estimate variability
      </text>

      {/* n=5 panel — multiple dots with jitter */}
      {[ctrlX5, trtX5].map((cx, gi) => (
        <g key={gi}>
          {JITTER_5.map((j, di) => (
            <circle
              key={di}
              cx={cx}
              cy={dotY + j * spread}
              r={R - 2}
              fill={gi === 0 ? "var(--muted)" : "var(--accent)"}
              opacity={0.55}
            />
          ))}
          {/* Mean line */}
          <line
            x1={cx - 18} y1={dotY}
            x2={cx + 18} y2={dotY}
            stroke={gi === 0 ? "var(--foreground)" : "var(--foreground)"}
            strokeWidth={2}
          />
          <text x={cx} y={dotY + R + 22} textAnchor="middle" fontSize={11} fill="var(--muted)">
            {gi === 0 ? "Control" : "Treated"}
          </text>
        </g>
      ))}
      <text x={midX + panelW / 2} y={H - 20} textAnchor="middle" fontSize={10} fill="var(--accent)">
        Variability is measurable
      </text>
    </svg>
  );
}
