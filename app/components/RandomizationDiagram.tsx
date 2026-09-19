"use client";

const POSITIONS: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [3, 0],
  [0, 1], [1, 1], [2, 1], [3, 1],
];

export default function RandomizationDiagram() {
  const W = 560;
  const H = 180;
  const R = 10;
  const gap = 30;
  const leftStartX = 44;
  const leftStartY = 60;

  const rightCtrlX = 390;
  const rightTrtX = 490;
  const rightStartY = 52;
  const rightGap = 28;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Left: 8 unlabeled units */}
      <text x={leftStartX + gap * 1.5} y={34} textAnchor="middle" fontSize={11} fill="var(--muted)">
        8 experimental units
      </text>
      {POSITIONS.map(([col, row], i) => (
        <circle
          key={i}
          cx={leftStartX + col * gap}
          cy={leftStartY + row * gap}
          r={R}
          fill="var(--panel)"
          stroke="var(--border)"
          strokeWidth={1.5}
        />
      ))}

      {/* Arrow */}
      <line x1={165} y1={H / 2} x2={230} y2={H / 2} stroke="var(--foreground)" strokeWidth={1.5} />
      <polygon points={`230,${H / 2 - 5} 230,${H / 2 + 5} 240,${H / 2}`} fill="var(--foreground)" />
      <text x={202} y={H / 2 - 10} textAnchor="middle" fontSize={10} fill="var(--muted)">
        Random
      </text>
      <text x={202} y={H / 2 + 20} textAnchor="middle" fontSize={10} fill="var(--muted)">
        assignment
      </text>

      {/* Right: Control column */}
      <text x={rightCtrlX} y={34} textAnchor="middle" fontSize={11} fill="var(--muted)">Control</text>
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={rightCtrlX}
          cy={rightStartY + i * rightGap}
          r={R}
          fill="var(--panel)"
          stroke="var(--muted)"
          strokeWidth={1.5}
        />
      ))}

      {/* Right: Treated column */}
      <text x={rightTrtX} y={34} textAnchor="middle" fontSize={11} fill="var(--accent)">Treated</text>
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={rightTrtX}
          cy={rightStartY + i * rightGap}
          r={R}
          fill="var(--accent)"
          opacity={0.65}
        />
      ))}

      {/* Bottom note */}
      <text x={390} y={H - 10} textAnchor="middle" fontSize={10} fill="var(--muted)">
        chance prevents systematic bias
      </text>
    </svg>
  );
}
