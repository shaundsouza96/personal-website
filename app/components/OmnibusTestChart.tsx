export default function OmnibusTestChart() {
  const fg = "#191919";
  const muted = "#66645f";
  const border = "#d9d8d2";

  const panelW = 240;
  const panelH = 200;
  const cx = 110; // origin x
  const cy = 105; // origin y
  const axisLen = 75;

  // Scale: 1 unit = 50px
  const scale = 50;
  const toX = (v: number) => cx + v * scale;
  const toY = (v: number) => cy - v * scale;

  return (
    <div className="cateChartWrap">
      {/* LEFT: Fail to reject */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Confidence ellipse contains the origin — fail to reject null hypothesis"
      >
        <text x={panelW / 2} y={13} textAnchor="middle" fill={muted} fontSize={10} fontFamily="Georgia, serif">
          No evidence of heterogeneity
        </text>

        {/* Axes */}
        <line x1={cx - axisLen} y1={cy} x2={cx + axisLen} y2={cy} stroke={border} strokeWidth={1} strokeDasharray="3 3" />
        <line x1={cx} y1={cy - axisLen} x2={cx} y2={cy + axisLen} stroke={border} strokeWidth={1} strokeDasharray="3 3" />
        <text x={cx + axisLen + 3} y={cy + 4} fill={muted} fontSize={8} fontFamily="Arial, sans-serif">β(T×C)</text>
        <text x={cx + 3} y={cy - axisLen - 3} fill={muted} fontSize={8} fontFamily="Arial, sans-serif">β(T×P)</text>

        {/* Origin */}
        <circle cx={cx} cy={cy} r={3} fill="none" stroke={border} strokeWidth={1.5} />
        <text x={cx - 5} y={cy + 13} fill={muted} fontSize={8} fontFamily="Arial, sans-serif">(0,0)</text>

        {/* Estimate point: (0.2, 0.1) — near origin */}
        <circle cx={toX(0.2)} cy={toY(0.1)} r={4} fill={fg} />

        {/* Confidence ellipse containing origin */}
        <ellipse
          cx={toX(0.2)}
          cy={toY(0.1)}
          rx={42}
          ry={32}
          fill="none"
          stroke={fg}
          strokeWidth={1.2}
          strokeDasharray="5 3"
        />

        <text x={panelW / 2} y={panelH - 8} textAnchor="middle" fill={muted} fontSize={8.5} fontFamily="Arial, sans-serif">
          ellipse contains origin
        </text>
      </svg>

      {/* RIGHT: Reject */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Confidence ellipse excludes the origin — reject null hypothesis"
      >
        <text x={panelW / 2} y={13} textAnchor="middle" fill={muted} fontSize={10} fontFamily="Georgia, serif">
          Evidence of heterogeneity
        </text>

        {/* Axes */}
        <line x1={cx - axisLen} y1={cy} x2={cx + axisLen} y2={cy} stroke={border} strokeWidth={1} strokeDasharray="3 3" />
        <line x1={cx} y1={cy - axisLen} x2={cx} y2={cy + axisLen} stroke={border} strokeWidth={1} strokeDasharray="3 3" />
        <text x={cx + axisLen + 3} y={cy + 4} fill={muted} fontSize={8} fontFamily="Arial, sans-serif">β(T×C)</text>
        <text x={cx + 3} y={cy - axisLen - 3} fill={muted} fontSize={8} fontFamily="Arial, sans-serif">β(T×P)</text>

        {/* Origin — clearly outside ellipse */}
        <circle cx={cx} cy={cy} r={3} fill="none" stroke={border} strokeWidth={1.5} />
        <text x={cx - 5} y={cy + 13} fill={muted} fontSize={8} fontFamily="Arial, sans-serif">(0,0)</text>

        {/* Estimate point: (1.2, 0.9) — far from origin */}
        <circle cx={toX(1.2)} cy={toY(0.9)} r={4} fill={fg} />

        {/* Confidence ellipse NOT containing origin */}
        <ellipse
          cx={toX(1.2)}
          cy={toY(0.9)}
          rx={38}
          ry={28}
          fill="none"
          stroke={fg}
          strokeWidth={1.2}
          strokeDasharray="5 3"
        />

        <text x={panelW / 2} y={panelH - 8} textAnchor="middle" fill={muted} fontSize={8.5} fontFamily="Arial, sans-serif">
          origin excluded
        </text>
      </svg>
    </div>
  );
}
