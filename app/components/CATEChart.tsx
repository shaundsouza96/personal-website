export const segmentColors = {
  power:    "#3d7a75",
  casual:   "#b8872c",
  inactive: "#c4622d",
} as const;

export default function CATEChart() {
  const fg    = "#191919";
  const muted = "#66645f";
  const grid  = "#d9d8d2";

  const ctrlX      = 155;
  const testX      = 470;
  const axisBottom = 430;
  const axisTop    = 70;
  const panelH     = 520;
  const panelW     = 680;

  const gridYs = [168, 253, 338];

  const ate = { y1: 248, y2: 248 };

  const cate = [
    { label: "Power Users",    color: segmentColors.power,    y1: 218, y2: 109 },
    { label: "Inactive Users", color: segmentColors.inactive, y1: 227, y2: 332 },
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

  return (
    <div className="cateChartWrap">
      {/* ── LEFT PANEL: ATE ── */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Average Treatment Effect diagram"
      >
        {/* Panel title */}
        <text x={panelW / 2} y={38} textAnchor="middle" {...titleProps}>
          Average Treatment Effect
        </text>

        {/* Y-axis label */}
        <text
          x={22}
          y={(axisBottom + axisTop) / 2}
          textAnchor="middle"
          transform={`rotate(-90, 22, ${(axisBottom + axisTop) / 2})`}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={13}
          fill={muted}
        >
          Some metric
        </text>

        {/* Horizontal grid lines */}
        {gridYs.map((y) => (
          <line key={y} x1={ctrlX} y1={y} x2={testX} y2={y} stroke={grid} strokeWidth={0.5} />
        ))}

        {/* ATE flat line */}
        <line
          x1={ctrlX} y1={ate.y1}
          x2={testX} y2={ate.y2}
          stroke={fg} strokeWidth={3} strokeLinecap="round"
        />

        {/* Endpoint dots */}
        <circle cx={ctrlX} cy={ate.y1} r={5} fill={fg} />
        <circle cx={testX} cy={ate.y2} r={5} fill={fg} />

        {/* X-axis labels */}
        <text x={ctrlX} y={axisBottom + 24} textAnchor="middle" {...axisLabelProps}>Control</text>
        <text x={testX} y={axisBottom + 24} textAnchor="middle" {...axisLabelProps}>Test</text>
      </svg>

      {/* ── RIGHT PANEL: CATE ── */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Conditional Average Treatment Effect diagram"
      >
        {/* Panel title */}
        <text x={panelW / 2 - 20} y={38} textAnchor="middle" {...titleProps}>
          Conditional Average Treatment Effect
        </text>

        {/* Horizontal grid lines */}
        {gridYs.map((y) => (
          <line key={y} x1={ctrlX} y1={y} x2={testX} y2={y} stroke={grid} strokeWidth={0.5} />
        ))}

        {/* CATE lines + endpoint dots + inline labels */}
        {cate.map(({ label, color, y1, y2 }) => (
          <g key={label}>
            <line
              x1={ctrlX} y1={y1}
              x2={testX} y2={y2}
              stroke={color} strokeWidth={3} strokeLinecap="round"
            />
            <circle cx={ctrlX} cy={y1} r={5} fill={color} />
            <circle cx={testX} cy={y2} r={5} fill={color} />
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

        {/* X-axis labels */}
        <text x={ctrlX} y={axisBottom + 24} textAnchor="middle" {...axisLabelProps}>Control</text>
        <text x={testX} y={axisBottom + 24} textAnchor="middle" {...axisLabelProps}>Test</text>
      </svg>
    </div>
  );
}
