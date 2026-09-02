export default function SeparateTestsTrapChart() {
  const fg = "#191919";
  const muted = "#66645f";
  const border = "#d9d8d2";

  const panelW = 280;
  const panelH = 180;

  // Data range: -1 to 2.5 mapped to x range [60, 250]
  const xMin = -1;
  const xMax = 2.5;
  const xLeft = 60;
  const xRight = 250;
  const scale = (v: number) => xLeft + ((v - xMin) / (xMax - xMin)) * (xRight - xLeft);
  const zeroX = scale(0);

  // Left panel: two separate CIs
  const ciRows = [
    { label: "Inactive", pLabel: "p = .02", estimate: 1.0, lo: 0.25, hi: 1.75, y: 72 },
    { label: "Casual",   pLabel: "p = .12", estimate: 0.55, lo: -0.15, hi: 1.25, y: 112 },
  ];

  // Right panel: difference CI (Inactive − Casual)
  const diff = { estimate: 0.45, lo: -0.55, hi: 1.45, y: 90 };

  const dotR = 4;
  const tickH = 6;

  return (
    <div className="cateChartWrap">
      {/* LEFT: two separate t-tests */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Two separate t-tests showing overlapping confidence intervals"
      >
        <text x={panelW / 2} y={16} textAnchor="middle" fill={muted} fontSize={11} fontFamily="Georgia, serif">
          Two separate t-tests
        </text>

        {/* Zero reference line */}
        <line x1={zeroX} y1={28} x2={zeroX} y2={148} stroke={border} strokeWidth={1} strokeDasharray="3 3" />
        <text x={zeroX} y={156} textAnchor="middle" fill={muted} fontSize={8.5} fontFamily="Arial, sans-serif">0</text>

        {ciRows.map(({ label, pLabel, estimate, lo, hi, y }) => (
          <g key={label}>
            {/* CI whisker */}
            <line x1={scale(lo)} y1={y} x2={scale(hi)} y2={y} stroke={fg} strokeWidth={1.5} strokeLinecap="round" />
            {/* End ticks */}
            <line x1={scale(lo)} y1={y - tickH / 2} x2={scale(lo)} y2={y + tickH / 2} stroke={fg} strokeWidth={1.5} />
            <line x1={scale(hi)} y1={y - tickH / 2} x2={scale(hi)} y2={y + tickH / 2} stroke={fg} strokeWidth={1.5} />
            {/* Estimate dot */}
            <circle cx={scale(estimate)} cy={y} r={dotR} fill={fg} />
            {/* Labels */}
            <text x={xLeft - 6} y={y + 1} textAnchor="end" fill={fg} fontSize={9.5} fontFamily="Arial, sans-serif" dominantBaseline="middle">{label}</text>
            <text x={scale(hi) + 8} y={y + 1} fill={muted} fontSize={9} fontFamily="Arial, sans-serif" dominantBaseline="middle">{pLabel}</text>
          </g>
        ))}

        {/* Overlap annotation */}
        <text x={panelW / 2} y={145} textAnchor="middle" fill={muted} fontSize={9} fontFamily="Arial, sans-serif">
          CIs overlap — effects may not differ
        </text>
      </svg>

      {/* RIGHT: test the difference directly */}
      <svg
        viewBox={`0 0 ${panelW} ${panelH}`}
        width="100%"
        style={{ maxWidth: panelW }}
        aria-label="Testing the difference between two treatment effects directly"
      >
        <text x={panelW / 2} y={16} textAnchor="middle" fill={muted} fontSize={11} fontFamily="Georgia, serif">
          Test the difference directly
        </text>

        {/* Zero reference line */}
        <line x1={zeroX} y1={28} x2={zeroX} y2={148} stroke={border} strokeWidth={1} strokeDasharray="3 3" />
        <text x={zeroX} y={156} textAnchor="middle" fill={muted} fontSize={8.5} fontFamily="Arial, sans-serif">0</text>

        {/* Difference CI */}
        <line x1={scale(diff.lo)} y1={diff.y} x2={scale(diff.hi)} y2={diff.y} stroke={fg} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={scale(diff.lo)} y1={diff.y - tickH / 2} x2={scale(diff.lo)} y2={diff.y + tickH / 2} stroke={fg} strokeWidth={1.5} />
        <line x1={scale(diff.hi)} y1={diff.y - tickH / 2} x2={scale(diff.hi)} y2={diff.y + tickH / 2} stroke={fg} strokeWidth={1.5} />
        <circle cx={scale(diff.estimate)} cy={diff.y} r={dotR} fill={fg} />

        <text x={xLeft - 6} y={diff.y + 1} textAnchor="end" fill={fg} fontSize={9} fontFamily="Arial, sans-serif" dominantBaseline="middle">
          Inactive
        </text>
        <text x={xLeft - 6} y={diff.y + 12} textAnchor="end" fill={muted} fontSize={8.5} fontFamily="Arial, sans-serif" dominantBaseline="middle">
          − Casual
        </text>

        {/* Annotation: CI includes zero */}
        <text x={panelW / 2} y={133} textAnchor="middle" fill={muted} fontSize={9} fontFamily="Arial, sans-serif">
          CI includes zero
        </text>
        <text x={panelW / 2} y={145} textAnchor="middle" fill={muted} fontSize={9} fontFamily="Arial, sans-serif">
          difference not significant
        </text>
      </svg>
    </div>
  );
}
