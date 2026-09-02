export default function SubgroupPowerChart() {
  const fg     = "#191919";
  const muted  = "#66645f";
  const grid   = "#d9d8d2";
  const accent = "#5a67a8";

  const W = 720, H = 420;

  const cols = [
    { cx: 130, label: "2 groups",  groups: 2, nLabel: "n = 5,000 each", ci: 55  },
    { cx: 360, label: "4 groups",  groups: 4, nLabel: "n = 2,500 each", ci: 78  },
    { cx: 590, label: "8 groups",  groups: 8, nLabel: "n = 1,250 each", ci: 110 },
  ];

  const totalBarW = 190;
  const barTop    = 85;
  const barH      = 40;
  const barGap    = 3;
  const ciCenterY = 295;
  const ciCapW    = 20;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" aria-label="Subgroup noise comparison">
      {/* Header */}
      <text
        x={W / 2} y={30} textAnchor="middle"
        fontSize={13} fontFamily="Georgia, 'Times New Roman', serif"
        fill={muted} fontStyle="italic"
      >
        Total sample: n = 10,000
      </text>

      {/* Column labels */}
      {cols.map(({ cx, label }) => (
        <text key={label}
          x={cx} y={60} textAnchor="middle"
          fontSize={15} fontFamily="Georgia, 'Times New Roman', serif"
          fill={fg} fontWeight="600"
        >
          {label}
        </text>
      ))}

      {/* Group bars */}
      {cols.map(({ cx, groups, nLabel }) => {
        const gapTotal = (groups - 1) * barGap;
        const gW       = (totalBarW - gapTotal) / groups;
        const startX   = cx - totalBarW / 2;
        return (
          <g key={cx}>
            {Array.from({ length: groups }, (_, j) => (
              <rect
                key={j}
                x={startX + j * (gW + barGap)}
                y={barTop}
                width={gW}
                height={barH}
                fill={j % 2 === 0 ? "#d9d8d2" : "#c0bdb8"}
                rx={2}
              />
            ))}
            <text
              x={cx} y={barTop + barH + 20} textAnchor="middle"
              fontSize={12} fontFamily="Georgia, 'Times New Roman', serif"
              fill={muted}
            >
              {nLabel}
            </text>
          </g>
        );
      })}

      {/* Section separator */}
      <line x1={60} y1={barTop + barH + 42} x2={W - 40} y2={barTop + barH + 42} stroke={grid} strokeWidth={0.5} />
      <text
        x={W / 2} y={barTop + barH + 62} textAnchor="middle"
        fontSize={12} fontFamily="Georgia, 'Times New Roman', serif"
        fill={muted} fontStyle="italic"
      >
        confidence interval per group
      </text>

      {/* CI bars */}
      {cols.map(({ cx, ci, label }) => (
        <g key={label}>
          {/* Top cap */}
          <line
            x1={cx - ciCapW / 2} y1={ciCenterY - ci / 2}
            x2={cx + ciCapW / 2} y2={ciCenterY - ci / 2}
            stroke={accent} strokeWidth={2.5}
          />
          {/* Vertical line */}
          <line
            x1={cx} y1={ciCenterY - ci / 2}
            x2={cx} y2={ciCenterY + ci / 2}
            stroke={accent} strokeWidth={2.5}
          />
          {/* Bottom cap */}
          <line
            x1={cx - ciCapW / 2} y1={ciCenterY + ci / 2}
            x2={cx + ciCapW / 2} y2={ciCenterY + ci / 2}
            stroke={accent} strokeWidth={2.5}
          />
          {/* Center dot */}
          <circle cx={cx} cy={ciCenterY} r={5} fill={accent} />
        </g>
      ))}

      {/* Arrow annotations: CI width labels */}
      {cols.map(({ cx, ci, label }, i) => (
        <text
          key={label}
          x={cx + ciCapW / 2 + 10}
          y={ciCenterY + 4}
          fontSize={12}
          fontFamily="Georgia, 'Times New Roman', serif"
          fill={accent}
          fontStyle="italic"
        >
          {i === 0 ? "narrow" : i === 1 ? "wider" : "widest"}
        </text>
      ))}
    </svg>
  );
}
