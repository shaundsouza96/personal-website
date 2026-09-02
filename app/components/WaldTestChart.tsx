import { segmentColors } from "./CATEChart";

export default function WaldTestChart() {
  const fg    = "#191919";
  const muted = "#66645f";
  const grid  = "#d9d8d2";

  const panelW     = 680;
  const panelH     = 520;
  const ctrlX      = 155;
  const testX      = 470;
  const axisBottom = 430;
  const axisTop    = 70;
  const gridYs     = [168, 253, 338];

  // H₀: β₃ = 0 — same treatment effect for both segments (parallel slopes)
  const nullSegments = [
    { label: "Power Users",    color: segmentColors.power,    y1: 195, y2: 155 },
    { label: "Inactive Users", color: segmentColors.inactive, y1: 248, y2: 208 },
  ];

  // Hₐ: β₃ ≠ 0 — different treatment effects (diverging slopes)
  const altSegments = [
    { label: "Power Users",    color: segmentColors.power,    y1: 195, y2: 105 },
    { label: "Inactive Users", color: segmentColors.inactive, y1: 248, y2: 338 },
  ];

  const titleProps = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 16,
    fill: fg,
  } as const;

  const axisLabelProps = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 13,
    fill: muted,
  } as const;

  function Panel({
    segments,
    title,
  }: {
    segments: typeof nullSegments;
    title: string;
  }) {
    return (
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label={title}
      >
        <text x={panelW / 2} y={38} textAnchor="middle" {...titleProps}>
          {title}
        </text>

        {gridYs.map((y) => (
          <line key={y} x1={ctrlX} y1={y} x2={testX} y2={y} stroke={grid} strokeWidth={0.5} />
        ))}

        {segments.map(({ label, color, y1, y2 }) => (
          <g key={label}>
            <line
              x1={ctrlX} y1={y1}
              x2={testX}  y2={y2}
              stroke={color} strokeWidth={3} strokeLinecap="round"
            />
            <circle cx={ctrlX} cy={y1} r={5} fill={color} />
            <circle cx={testX}  cy={y2} r={5} fill={color} />
            <text
              x={testX + 14}
              y={y2 + 5}
              fill={color}
              fontSize={13}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontWeight="600"
            >
              {label}
            </text>
          </g>
        ))}

        <text x={ctrlX} y={axisBottom + 24} textAnchor="middle" {...axisLabelProps}>Control</text>
        <text x={testX}  y={axisBottom + 24} textAnchor="middle" {...axisLabelProps}>Test</text>
      </svg>
    );
  }

  return (
    <div className="cateChartWrap">
      <Panel segments={nullSegments} title="H₀: β₃ = 0  (same effect in each segment)" />
      <Panel segments={altSegments}  title="Hₐ: β₃ ≠ 0  (effects differ by segment)" />
    </div>
  );
}
