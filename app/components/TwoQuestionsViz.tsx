"use client";

export default function TwoQuestionsViz() {
  const W = 560;
  const H = 180;
  const midX = W / 2;
  const colW = midX - 20;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Divider */}
      <line x1={midX} y1={16} x2={midX} y2={H - 16} stroke="var(--border)" strokeWidth={1} />

      {/* Question 1 */}
      <text x={colW / 2} y={32} textAnchor="middle" fontSize={10} fill="var(--muted)" letterSpacing="0.08em">
        QUESTION 1
      </text>
      <text x={colW / 2} y={54} textAnchor="middle" fontSize={14} fontWeight="600" fill="var(--foreground)">
        Is there an effect?
      </text>

      {/* p-value pill */}
      <rect x={colW / 2 - 44} y={68} width={88} height={26} rx={13} fill="var(--accent)" opacity={0.15} />
      <text x={colW / 2} y={81} textAnchor="middle" dominantBaseline="middle" fontSize={13} fill="var(--accent)" fontWeight="600">
        p = 0.02
      </text>
      <text x={colW / 2} y={112} textAnchor="middle" fontSize={11} fill="var(--muted)">
        Less than 0.05 threshold
      </text>
      <text x={colW / 2} y={128} textAnchor="middle" fontSize={11} fill="var(--muted)">
        → statistically significant
      </text>
      <text x={colW / 2} y={H - 16} textAnchor="middle" fontSize={10} fill="var(--muted)">
        Significance testing
      </text>

      {/* Question 2 */}
      <text x={midX + colW / 2} y={32} textAnchor="middle" fontSize={10} fill="var(--muted)" letterSpacing="0.08em">
        QUESTION 2
      </text>
      <text x={midX + colW / 2} y={54} textAnchor="middle" fontSize={14} fontWeight="600" fill="var(--foreground)">
        How large is it?
      </text>

      {/* Effect size arrow */}
      <line x1={midX + 40} y1={88} x2={midX + colW - 20} y2={88} stroke="var(--foreground)" strokeWidth={2} />
      <polygon
        points={`${midX + colW - 20},83 ${midX + colW - 20},93 ${midX + colW - 10},88`}
        fill="var(--foreground)"
      />
      <text x={(midX + 40 + midX + colW - 20) / 2} y={80} textAnchor="middle" fontSize={10} fill="var(--muted)">
        effect size
      </text>
      <text x={midX + colW / 2} y={112} textAnchor="middle" fontSize={13} fill="var(--foreground)" fontWeight="600">
        +9.5 bushels/acre
      </text>
      <text x={midX + colW / 2} y={128} textAnchor="middle" fontSize={11} fill="var(--muted)">
        point estimate ± CI
      </text>
      <text x={midX + colW / 2} y={H - 16} textAnchor="middle" fontSize={10} fill="var(--muted)">
        Effect estimation
      </text>
    </svg>
  );
}
