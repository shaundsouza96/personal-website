"use client";

const NODES = [
  { x: 80, label: "Experimental\nDesign", sub: "Replication, blocking" },
  { x: 280, label: "Randomization", sub: "Random assignment" },
  { x: 480, label: "Statistical\nInference", sub: "ANOVA, p-values" },
];

const BOX_W = 120;
const BOX_H = 52;

export default function FisherFrameworkDiagram() {
  const W = 560;
  const H = 170;
  const nodeY = 60;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Connecting arrows */}
      {[0, 1].map((i) => {
        const fromX = NODES[i].x + BOX_W / 2;
        const toX = NODES[i + 1].x - BOX_W / 2;
        const arrowY = nodeY + BOX_H / 2;
        return (
          <g key={i}>
            <line
              x1={fromX + 4} y1={arrowY}
              x2={toX - 8} y2={arrowY}
              stroke="var(--border)" strokeWidth={1.5}
            />
            <polygon
              points={`${toX - 8},${arrowY - 5} ${toX - 8},${arrowY + 5} ${toX},${arrowY}`}
              fill="var(--border)"
            />
          </g>
        );
      })}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const x = node.x - BOX_W / 2;
        const y = nodeY;
        const isMiddle = i === 1;
        const lines = node.label.split("\n");
        return (
          <g key={i}>
            <rect
              x={x} y={y}
              width={BOX_W} height={BOX_H}
              rx={6}
              fill="var(--panel)"
              stroke={isMiddle ? "var(--accent)" : "var(--border)"}
              strokeWidth={isMiddle ? 1.5 : 1}
            />
            {lines.map((line, li) => (
              <text
                key={li}
                x={node.x}
                y={y + BOX_H / 2 + (lines.length === 1 ? 0 : li === 0 ? -7 : 7)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
                fontWeight="600"
                fill="var(--foreground)"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Sub-labels */}
      {NODES.map((node, i) => (
        <text
          key={i}
          x={node.x}
          y={nodeY + BOX_H + 18}
          textAnchor="middle"
          fontSize={10}
          fill="var(--muted)"
        >
          {node.sub}
        </text>
      ))}

      {/* Unified bracket */}
      <line x1={NODES[0].x - BOX_W / 2} y1={nodeY + BOX_H + 34} x2={NODES[2].x + BOX_W / 2} y2={nodeY + BOX_H + 34} stroke="var(--border)" strokeWidth={1} />
      <line x1={NODES[0].x - BOX_W / 2} y1={nodeY + BOX_H + 28} x2={NODES[0].x - BOX_W / 2} y2={nodeY + BOX_H + 34} stroke="var(--border)" strokeWidth={1} />
      <line x1={NODES[2].x + BOX_W / 2} y1={nodeY + BOX_H + 28} x2={NODES[2].x + BOX_W / 2} y2={nodeY + BOX_H + 34} stroke="var(--border)" strokeWidth={1} />
      <text x={W / 2} y={nodeY + BOX_H + 50} textAnchor="middle" fontSize={11} fill="var(--muted)">
        Fisher&apos;s unified contribution
      </text>
    </svg>
  );
}
