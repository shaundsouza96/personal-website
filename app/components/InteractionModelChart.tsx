import { segmentColors } from "./CATEChart";

export default function InteractionModelChart() {
  const muted = "#66645f";
  const grid  = "#d9d8d2";

  const panelW     = 680;
  const panelH     = 520;
  const ctrlX      = 155;
  const testX      = 470;
  const axisBottom = 430;
  const axisTop    = 70;
  const gridYs     = [168, 253, 338];

  const segments = [
    {
      label: "Power Users",
      color: segmentColors.power,
      y1: 195, y2: 105,
      ctrlDots: [{ x: 135, y: 182 }, { x: 148, y: 208 }, { x: 168, y: 190 }],
      testDots:  [{ x: 450, y: 92  }, { x: 462, y: 118 }, { x: 482, y: 98  }],
    },
    {
      label: "Inactive Users",
      color: segmentColors.inactive,
      y1: 248, y2: 338,
      ctrlDots: [{ x: 138, y: 262 }, { x: 152, y: 234 }, { x: 170, y: 254 }],
      testDots:  [{ x: 453, y: 352 }, { x: 465, y: 322 }, { x: 484, y: 346 }],
    },
  ];

  const axisLabelProps = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 13,
    fill: muted,
  } as const;

  return (
    <svg viewBox={`0 0 ${panelW} ${panelH}`} width="100%" aria-label="Interaction model diagram">
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

      {/* Segments */}
      {segments.map(({ label, color, y1, y2, ctrlDots, testDots }) => (
        <g key={label}>
          {ctrlDots.map(({ x, y }, i) => (
            <circle key={`ctrl-${i}`} cx={x} cy={y} r={3.5} fill={color} opacity={0.4} />
          ))}
          {testDots.map(({ x, y }, i) => (
            <circle key={`test-${i}`} cx={x} cy={y} r={3.5} fill={color} opacity={0.4} />
          ))}
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
        Y = β₀ + β₁T + β₂S + β₃(T × S)
      </text>
    </svg>
  );
}
