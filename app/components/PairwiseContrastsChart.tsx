export default function PairwiseContrastsChart() {
  const fg = "#191919";
  const muted = "#66645f";
  const border = "#d9d8d2";

  const W = 360;
  const H = 180;

  // Scale: data range [-4, 22] → x range [80, 300]
  const dMin = -4;
  const dMax = 22;
  const xLeft = 80;
  const xRight = 300;
  const scale = (v: number) => xLeft + ((v - dMin) / (dMax - dMin)) * (xRight - xLeft);
  const zeroX = scale(0);

  const rows = [
    { label: "Inact. vs Casual", pLabel: "p = .08",  estimate: 5,  lo: -1, hi: 11, y: 70  },
    { label: "Inact. vs Power",  pLabel: "p = .003", estimate: 12, lo: 4,  hi: 20, y: 105 },
    { label: "Casual vs Power",  pLabel: "p = .04",  estimate: 7,  lo: 0,  hi: 14, y: 140 },
  ];

  const tickH = 6;
  const dotR = 4;

  return (
    <div className="cateChartWrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ maxWidth: W }}
        aria-label="Pairwise differences in treatment effects between segments"
      >
        <text x={W / 2} y={16} textAnchor="middle" fill={muted} fontSize={11} fontFamily="Georgia, serif">
          Difference in treatment effect
        </text>

        {/* Zero reference line */}
        <line x1={zeroX} y1={28} x2={zeroX} y2={158} stroke={border} strokeWidth={1} strokeDasharray="3 3" />
        <text x={zeroX} y={165} textAnchor="middle" fill={muted} fontSize={8.5} fontFamily="Arial, sans-serif">0</text>

        {rows.map(({ label, pLabel, estimate, lo, hi, y }) => (
          <g key={label}>
            <line x1={scale(lo)} y1={y} x2={scale(hi)} y2={y} stroke={fg} strokeWidth={1.5} strokeLinecap="round" />
            <line x1={scale(lo)} y1={y - tickH / 2} x2={scale(lo)} y2={y + tickH / 2} stroke={fg} strokeWidth={1.5} />
            <line x1={scale(hi)} y1={y - tickH / 2} x2={scale(hi)} y2={y + tickH / 2} stroke={fg} strokeWidth={1.5} />
            <circle cx={scale(estimate)} cy={y} r={dotR} fill={fg} />
            <text x={75} y={y + 1} textAnchor="end" fill={fg} fontSize={9.5} fontFamily="Arial, sans-serif" dominantBaseline="middle">{label}</text>
            <text x={scale(hi) + 8} y={y + 1} fill={muted} fontSize={9} fontFamily="Arial, sans-serif" dominantBaseline="middle">{pLabel}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
