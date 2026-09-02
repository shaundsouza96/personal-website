import { segmentColors } from "./CATEChart";

export default function CATEEstimatesChart() {
  const fg    = "#191919";
  const muted = "#66645f";
  const grid  = "#d9d8d2";

  const panelW = 680;
  const panelH = 520;

  // Scale: val in %, x = 140 + (val + 20) * 10
  // covers -20% (x=140) to +30% (x=640)
  const toX = (val: number) => 140 + (val + 20) * 10;

  const axisY1 = 100;
  const axisY2 = 440;
  const capH   = 8;

  const titleProps = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 16,
    fill: fg,
  } as const;

  const tickLabelProps = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 12,
    fill: muted,
    textAnchor: "middle" as const,
  };

  const leftBars = [
    { val: 15, lo: 8,   hi: 22, y: 225, color: segmentColors.power,    name: "Power Users"    },
    { val: -5, lo: -12, hi: 2,  y: 335, color: segmentColors.inactive, name: "Inactive Users" },
  ];

  const leftTicks  = [-10, 0, 10, 20];
  const rightTicks = [0, 10, 20, 30];

  return (
    <div className="cateChartWrap">
      {/* LEFT: test each CATE against zero */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Testing each CATE against zero"
      >
        <text x={panelW / 2} y={38} textAnchor="middle" {...titleProps}>
          Testing each CATE against zero
        </text>

        {leftTicks.map((v) => (
          <g key={v}>
            <line
              x1={toX(v)} y1={axisY1}
              x2={toX(v)} y2={axisY2}
              stroke={grid}
              strokeWidth={v === 0 ? 1 : 0.5}
              strokeDasharray={v === 0 ? undefined : "4 3"}
            />
            <text x={toX(v)} y={axisY2 + 22} {...tickLabelProps}>
              {v === 0 ? "0%" : v > 0 ? `+${v}%` : `${v}%`}
            </text>
          </g>
        ))}

        {leftBars.map(({ val, lo, hi, y, color, name }) => (
          <g key={name}>
            {/* CI line */}
            <line x1={toX(lo)} y1={y} x2={toX(hi)} y2={y} stroke={color} strokeWidth={2.5} />
            {/* Caps */}
            <line x1={toX(lo)} y1={y - capH} x2={toX(lo)} y2={y + capH} stroke={color} strokeWidth={2} />
            <line x1={toX(hi)} y1={y - capH} x2={toX(hi)} y2={y + capH} stroke={color} strokeWidth={2} />
            {/* Estimate dot */}
            <circle cx={toX(val)} cy={y} r={5} fill={color} />
            {/* Segment name — right of CI */}
            <text
              x={toX(hi) + 12}
              y={y + 4}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={13}
              fill={color}
              fontWeight="600"
            >
              {name}
            </text>
            {/* Estimate value — below dot */}
            <text
              x={toX(val)}
              y={y + 20}
              textAnchor="middle"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={12}
              fill={color}
              fontStyle="italic"
            >
              {val > 0 ? `+${val}%` : `${val}%`}
            </text>
          </g>
        ))}
      </svg>

      {/* RIGHT: test the difference directly */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Testing the difference directly"
      >
        <text x={panelW / 2} y={38} textAnchor="middle" {...titleProps}>
          Testing the difference directly
        </text>

        {rightTicks.map((v) => (
          <g key={v}>
            <line
              x1={toX(v)} y1={axisY1}
              x2={toX(v)} y2={axisY2}
              stroke={grid}
              strokeWidth={v === 0 ? 1 : 0.5}
              strokeDasharray={v === 0 ? undefined : "4 3"}
            />
            <text x={toX(v)} y={axisY2 + 22} {...tickLabelProps}>
              {v === 0 ? "0%" : `+${v}%`}
            </text>
          </g>
        ))}

        {/* Label above the bar */}
        <text
          x={(toX(10) + toX(30)) / 2}
          y={250}
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={13}
          fill={fg}
        >
          CATE(Power) − CATE(Inactive)
        </text>

        {/* CI bar for the contrast */}
        <line x1={toX(10)} y1={272} x2={toX(30)} y2={272} stroke={fg} strokeWidth={2.5} />
        <line x1={toX(10)} y1={272 - capH} x2={toX(10)} y2={272 + capH} stroke={fg} strokeWidth={2} />
        <line x1={toX(30)} y1={272 - capH} x2={toX(30)} y2={272 + capH} stroke={fg} strokeWidth={2} />
        <circle cx={toX(20)} cy={272} r={5} fill={fg} />
        <text
          x={toX(20)}
          y={292}
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={12}
          fill={fg}
          fontStyle="italic"
        >
          +20%
        </text>
      </svg>
    </div>
  );
}
