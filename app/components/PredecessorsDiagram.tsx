"use client";

export default function PredecessorsDiagram() {
  const W = 560;
  const H = 180;
  const nodeY = 72;
  const gossetX = 140;
  const fisherX = 420;
  const r = 34;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Timeline baseline */}
      <line x1={60} y1={nodeY} x2={500} y2={nodeY} stroke="var(--border)" strokeWidth={1} />

      {/* Connecting arrow */}
      <line
        x1={gossetX + r} y1={nodeY}
        x2={fisherX - r - 8} y2={nodeY}
        stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="5 3"
      />
      <polygon
        points={`${fisherX - r - 8},${nodeY - 5} ${fisherX - r - 8},${nodeY + 5} ${fisherX - r},${nodeY}`}
        fill="var(--accent)"
      />
      <text x={(gossetX + fisherX) / 2} y={nodeY - 10} textAnchor="middle" fontSize={10} fill="var(--accent)">
        extended by
      </text>

      {/* Gosset node */}
      <circle cx={gossetX} cy={nodeY} r={r} fill="var(--panel)" stroke="var(--border)" strokeWidth={1.5} />
      <text x={gossetX} y={nodeY - 6} textAnchor="middle" fontSize={12} fontWeight="600" fill="var(--foreground)">
        Gosset
      </text>
      <text x={gossetX} y={nodeY + 9} textAnchor="middle" fontSize={10} fill="var(--muted)">
        1908
      </text>

      {/* Gosset description */}
      <text x={gossetX} y={nodeY + r + 18} textAnchor="middle" fontSize={11} fill="var(--muted)">
        Student&apos;s t-test
      </text>
      <text x={gossetX} y={nodeY + r + 33} textAnchor="middle" fontSize={10} fill="var(--muted)">
        inference from small samples
      </text>

      {/* Fisher node */}
      <circle cx={fisherX} cy={nodeY} r={r} fill="var(--panel)" stroke="var(--accent)" strokeWidth={1.5} />
      <text x={fisherX} y={nodeY - 6} textAnchor="middle" fontSize={12} fontWeight="600" fill="var(--foreground)">
        Fisher
      </text>
      <text x={fisherX} y={nodeY + 9} textAnchor="middle" fontSize={10} fill="var(--muted)">
        1920s–30s
      </text>

      {/* Fisher description */}
      <text x={fisherX} y={nodeY + r + 18} textAnchor="middle" fontSize={11} fill="var(--muted)">
        ANOVA + experimental design
      </text>
      <text x={fisherX} y={nodeY + r + 33} textAnchor="middle" fontSize={10} fill="var(--muted)">
        systematic theory of inference
      </text>
    </svg>
  );
}
