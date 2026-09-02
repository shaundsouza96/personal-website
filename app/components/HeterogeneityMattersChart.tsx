export default function HeterogeneityMattersChart() {
  const fg = "#191919";
  const muted = "#66645f";
  const border = "#d9d8d2";

  const panelW = 280;
  const panelH = 200;
  const zeroY = 120;
  const scale = 7; // px per pp

  // Left panel: single small bar for overall ATE (+2pp)
  const ateVal = 2;
  const ateBarH = ateVal * scale;
  const ateBarW = 50;
  const ateBarX = panelW / 2 - ateBarW / 2;

  // Right panel: three bars
  const segments = [
    { label: "Inactive", value: 10, x: 42 },
    { label: "Casual",   value: 2,  x: 112 },
    { label: "Power",    value: -5, x: 182 },
  ];
  const barW = 44;

  return (
    <div className="cateChartWrap">
      {/* LEFT: Overall ATE */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Overall average treatment effect of +2 pp"
      >
        <text x={panelW / 2} y={14} textAnchor="middle" fill={muted} fontSize={11} fontFamily="Georgia, serif">
          Overall ATE
        </text>

        {/* Zero line */}
        <line x1={30} y1={zeroY} x2={panelW - 20} y2={zeroY} stroke={border} strokeWidth={1} />
        <text x={28} y={zeroY + 4} textAnchor="end" fill={muted} fontSize={9} fontFamily="Arial, sans-serif">0</text>

        {/* ATE bar */}
        <rect
          x={ateBarX}
          y={zeroY - ateBarH}
          width={ateBarW}
          height={ateBarH}
          fill={fg}
        />
        <text x={ateBarX + ateBarW / 2} y={zeroY - ateBarH - 6} textAnchor="middle" fill={fg} fontSize={10} fontFamily="Arial, sans-serif">
          +2 pp
        </text>
        <text x={ateBarX + ateBarW / 2} y={zeroY + 16} textAnchor="middle" fill={muted} fontSize={9.5} fontFamily="Arial, sans-serif">
          All users
        </text>
      </svg>

      {/* RIGHT: By segment */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Treatment effect by segment: Inactive +10pp, Casual +2pp, Power −5pp"
      >
        <text x={panelW / 2} y={14} textAnchor="middle" fill={muted} fontSize={11} fontFamily="Georgia, serif">
          By Segment
        </text>

        {/* Zero line */}
        <line x1={20} y1={zeroY} x2={panelW - 10} y2={zeroY} stroke={border} strokeWidth={1} />
        <text x={18} y={zeroY + 4} textAnchor="end" fill={muted} fontSize={9} fontFamily="Arial, sans-serif">0</text>

        {segments.map(({ label, value, x }) => {
          const h = Math.abs(value) * scale;
          const isNeg = value < 0;
          const rectY = isNeg ? zeroY : zeroY - h;
          const valLabel = value > 0 ? `+${value} pp` : `${value} pp`;
          const valY = isNeg ? zeroY + h + 14 : zeroY - h - 6;
          return (
            <g key={label}>
              <rect x={x} y={rectY} width={barW} height={h} fill={isNeg ? muted : fg} />
              <text x={x + barW / 2} y={valY} textAnchor="middle" fill={isNeg ? muted : fg} fontSize={9.5} fontFamily="Arial, sans-serif">
                {valLabel}
              </text>
              <text x={x + barW / 2} y={zeroY + (isNeg ? h + 26 : 16)} textAnchor="middle" fill={muted} fontSize={9} fontFamily="Arial, sans-serif">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
