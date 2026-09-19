"use client";

const CONTROL = [42, 38, 45, 40, 37, 44, 39, 43];
const TREATED = [51, 47, 54, 49, 46, 53, 48, 52];

const controlMean = CONTROL.reduce((a, b) => a + b, 0) / CONTROL.length;
const treatedMean = TREATED.reduce((a, b) => a + b, 0) / TREATED.length;

const JITTER = [0.15, -0.2, 0.25, -0.1, 0.3, -0.25, 0.05, -0.15];

export default function VariationChart() {
  const W = 560;
  const H = 260;
  const PAD = { top: 20, right: 40, bottom: 48, left: 48 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const allVals = [...CONTROL, ...TREATED];
  const minY = Math.min(...allVals) - 4;
  const maxY = Math.max(...allVals) + 4;

  const scaleY = (v: number) => PAD.top + plotH - ((v - minY) / (maxY - minY)) * plotH;

  const groupW = plotW * 0.35;
  const controlX = PAD.left + plotW * 0.2;
  const treatedX = PAD.left + plotW * 0.65;

  const dotR = 5;
  const jitterAmp = groupW * 0.28;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Y axis */}
      <line
        x1={PAD.left} y1={PAD.top}
        x2={PAD.left} y2={PAD.top + plotH}
        stroke="var(--border)" strokeWidth={1}
      />
      {/* Y ticks */}
      {[35, 40, 45, 50, 55].map(v => (
        <g key={v}>
          <line
            x1={PAD.left - 4} y1={scaleY(v)}
            x2={PAD.left} y2={scaleY(v)}
            stroke="var(--border)" strokeWidth={1}
          />
          <text
            x={PAD.left - 8} y={scaleY(v)}
            textAnchor="end" dominantBaseline="middle"
            fontSize={11} fill="var(--muted)"
          >{v}</text>
        </g>
      ))}
      {/* Y label */}
      <text
        x={12} y={PAD.top + plotH / 2}
        textAnchor="middle" fontSize={11} fill="var(--muted)"
        transform={`rotate(-90, 12, ${PAD.top + plotH / 2})`}
      >Yield (bushels/acre)</text>

      {/* Control dots */}
      {CONTROL.map((v, i) => (
        <circle
          key={i}
          cx={controlX + JITTER[i] * jitterAmp}
          cy={scaleY(v)}
          r={dotR}
          fill="var(--muted)" opacity={0.55}
        />
      ))}
      {/* Control mean line */}
      <line
        x1={controlX - groupW * 0.45} y1={scaleY(controlMean)}
        x2={controlX + groupW * 0.45} y2={scaleY(controlMean)}
        stroke="var(--foreground)" strokeWidth={2}
      />
      <text
        x={controlX} y={H - 12}
        textAnchor="middle" fontSize={12} fill="var(--foreground)"
      >Control</text>

      {/* Treated dots */}
      {TREATED.map((v, i) => (
        <circle
          key={i}
          cx={treatedX + JITTER[i] * jitterAmp}
          cy={scaleY(v)}
          r={dotR}
          fill="var(--muted)" opacity={0.55}
        />
      ))}
      {/* Treated mean line */}
      <line
        x1={treatedX - groupW * 0.45} y1={scaleY(treatedMean)}
        x2={treatedX + groupW * 0.45} y2={scaleY(treatedMean)}
        stroke="var(--foreground)" strokeWidth={2}
      />
      <text
        x={treatedX} y={H - 12}
        textAnchor="middle" fontSize={12} fill="var(--foreground)"
      >Treated</text>

      {/* Difference arrow */}
      <line
        x1={treatedX + groupW * 0.55} y1={scaleY(controlMean)}
        x2={treatedX + groupW * 0.55} y2={scaleY(treatedMean)}
        stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 2"
      />
      <text
        x={treatedX + groupW * 0.55 + 8} y={(scaleY(controlMean) + scaleY(treatedMean)) / 2}
        dominantBaseline="middle" fontSize={11} fill="var(--accent)"
      >+{(treatedMean - controlMean).toFixed(1)}</text>
    </svg>
  );
}
