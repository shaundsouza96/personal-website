export default function SimpleRegressionChart() {
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

  const ctrlMeanY = 278;
  const testMeanY = 148;

  const ctrlDots = [
    { x: 135, y: 262 }, { x: 147, y: 296 }, { x: 168, y: 270 },
    { x: 142, y: 300 }, { x: 173, y: 258 }, { x: 160, y: 244 },
  ];

  const testDots = [
    { x: 452, y: 134 }, { x: 463, y: 164 }, { x: 485, y: 142 },
    { x: 457, y: 162 }, { x: 478, y: 128 }, { x: 490, y: 158 },
  ];

  const braceX   = 530;
  const braceMidY = (ctrlMeanY + testMeanY) / 2;

  const axisLabelProps = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 13,
    fill: muted,
  } as const;

  return (
    <svg viewBox={`0 0 ${panelW} ${panelH}`} width="100%" aria-label="Simple regression diagram">
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

      {/* Scatter dots */}
      {ctrlDots.map(({ x, y }, i) => (
        <circle key={`ctrl-${i}`} cx={x} cy={y} r={3.5} fill={muted} opacity={0.45} />
      ))}
      {testDots.map(({ x, y }, i) => (
        <circle key={`test-${i}`} cx={x} cy={y} r={3.5} fill={muted} opacity={0.45} />
      ))}

      {/* Regression line */}
      <line
        x1={ctrlX} y1={ctrlMeanY}
        x2={testX}  y2={testMeanY}
        stroke={fg} strokeWidth={3} strokeLinecap="round"
      />

      {/* Group mean circles */}
      <circle cx={ctrlX} cy={ctrlMeanY} r={6} fill={fg} />
      <circle cx={testX}  cy={testMeanY}  r={6} fill={fg} />

      {/* β₀ label */}
      <text
        x={ctrlX - 24}
        y={ctrlMeanY - 14}
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={15}
        fill={fg}
        fontStyle="italic"
      >
        β₀
      </text>

      {/* β₁ brace: vertical line with tick caps */}
      <line x1={braceX} y1={testMeanY} x2={braceX} y2={ctrlMeanY} stroke={fg} strokeWidth={1.5} />
      <line x1={braceX - 5} y1={testMeanY} x2={braceX + 5} y2={testMeanY} stroke={fg} strokeWidth={1.5} />
      <line x1={braceX - 5} y1={ctrlMeanY} x2={braceX + 5} y2={ctrlMeanY} stroke={fg} strokeWidth={1.5} />
      <text
        x={braceX + 16}
        y={braceMidY + 5}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={15}
        fill={fg}
        fontStyle="italic"
      >
        β₁
      </text>

      {/* X-axis labels */}
      <text x={ctrlX} y={axisBottom + 24} textAnchor="middle" {...axisLabelProps}>Control</text>
      <text x={testX}  y={axisBottom + 24} textAnchor="middle" {...axisLabelProps}>Test</text>

      {/* Equation caption */}
      <text
        x={panelW / 2} y={axisBottom + 54}
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={14}
        fill={muted}
        fontStyle="italic"
      >
        Y = β₀ + β₁ · Treatment
      </text>
    </svg>
  );
}
