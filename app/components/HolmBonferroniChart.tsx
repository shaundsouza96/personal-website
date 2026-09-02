export default function HolmBonferroniChart() {
  const fg    = "#191919";
  const muted = "#66645f";
  const grid  = "#d9d8d2";
  const pass  = "#3d7a75";
  const fail  = "#c4622d";

  const panelW = 680;
  const panelH = 520;

  // Scale: p-values 0 to 0.10 → x = 150 to 570
  const toX = (p: number) => 150 + (p / 0.10) * 420;

  const rows = [
    { rank: "1", p: 0.003, pLabel: ".003", threshold: 0.017, thrLabel: "α/3 = .017", decision: "✓ reject", state: "pass",   y: 185 },
    { rank: "2", p: 0.040, pLabel: ".040", threshold: 0.025, thrLabel: "α/2 = .025", decision: "✗ stop",   state: "fail",   y: 305 },
    { rank: "3", p: 0.080, pLabel: ".080", threshold: 0.050, thrLabel: "α/1 = .050", decision: "— retain", state: "retain", y: 425 },
  ] as const;

  return (
    <svg viewBox={`0 0 ${panelW} ${panelH}`} width="100%" aria-label="Holm-Bonferroni step-down procedure">
      {/* Column headers */}
      <text x={80}  y={58} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize={13} fill={muted}>Rank</text>
      <text x={360} y={58} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize={13} fill={muted}>p-value vs. adjusted threshold</text>
      <text x={620} y={58} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize={13} fill={muted}>Decision</text>

      <line x1={40} y1={72} x2={panelW - 40} y2={72} stroke={grid} strokeWidth={0.5} />

      {rows.map(({ rank, p, pLabel, threshold, thrLabel, decision, state, y }) => {
        const dotColor  = state === "pass" ? pass  : state === "fail" ? fail  : muted;
        const textColor = state === "pass" ? fg    : state === "fail" ? fail  : muted;
        const dotX      = toX(p);
        const thrX      = toX(threshold);

        return (
          <g key={rank}>
            {/* Guide line */}
            <line x1={150} y1={y} x2={570} y2={y} stroke={grid} strokeWidth={0.5} />

            {/* Rank */}
            <text
              x={80} y={y}
              textAnchor="middle"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={30}
              fill={muted}
              dominantBaseline="middle"
            >
              {rank}
            </text>

            {/* Threshold dashed marker */}
            <line x1={thrX} y1={y - 18} x2={thrX} y2={y + 18} stroke={grid} strokeWidth={1.5} strokeDasharray="4 3" />
            <text
              x={thrX} y={y + 34}
              textAnchor="middle"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={11}
              fill={muted}
              fontStyle="italic"
            >
              {thrLabel}
            </text>

            {/* P-value dot */}
            <circle cx={dotX} cy={y} r={6} fill={dotColor} />

            {/* P-value label above dot */}
            <text
              x={dotX} y={y - 22}
              textAnchor="middle"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={12}
              fill={dotColor}
              fontStyle="italic"
            >
              p = {pLabel}
            </text>

            {/* Decision */}
            <text
              x={620} y={y}
              textAnchor="middle"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={14}
              fill={textColor}
              fontWeight={state === "pass" ? "600" : "400"}
              dominantBaseline="middle"
            >
              {decision}
            </text>

            {/* Row separator */}
            <line x1={40} y1={y + 52} x2={panelW - 40} y2={y + 52} stroke={grid} strokeWidth={0.5} />
          </g>
        );
      })}
    </svg>
  );
}
