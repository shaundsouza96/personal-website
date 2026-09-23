"use client";
import { useState } from "react";

function normalPDF(x: number, mean = 0, sd = 1) {
  return Math.exp(-0.5 * ((x - mean) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));
}

function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212560 + t * 1.3302744))));
  return z > 0 ? 1 - p : p;
}

function pValue(z: number) {
  return 2 * (1 - normalCDF(Math.abs(z)));
}

function buildCurvePath(x1: number, x2: number, scaleX: (v: number) => number, scaleY: (v: number) => number, steps = 120) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = x1 + (x2 - x1) * (i / steps);
    const y = normalPDF(x);
    pts.push(`${i === 0 ? "M" : "L"}${scaleX(x).toFixed(1)},${scaleY(y).toFixed(1)}`);
  }
  return pts.join(" ");
}

function buildShadedPath(zObs: number, scaleX: (v: number) => number, scaleY: (v: number) => number) {
  const absZ = Math.abs(zObs);
  const xMax = 3.5;
  const steps = 80;
  const pts: string[] = [];

  // right tail
  pts.push(`M${scaleX(absZ).toFixed(1)},${scaleY(0).toFixed(1)}`);
  for (let i = 0; i <= steps; i++) {
    const x = absZ + (xMax - absZ) * (i / steps);
    pts.push(`L${scaleX(x).toFixed(1)},${scaleY(normalPDF(x)).toFixed(1)}`);
  }
  pts.push(`L${scaleX(xMax).toFixed(1)},${scaleY(0).toFixed(1)} Z`);

  // left tail
  pts.push(`M${scaleX(-xMax).toFixed(1)},${scaleY(0).toFixed(1)}`);
  for (let i = 0; i <= steps; i++) {
    const x = -xMax + (xMax - absZ) * (i / steps);
    pts.push(`L${scaleX(x).toFixed(1)},${scaleY(normalPDF(x)).toFixed(1)}`);
  }
  pts.push(`L${scaleX(-absZ).toFixed(1)},${scaleY(0).toFixed(1)} Z`);

  return pts.join(" ");
}

export default function SamplingDistributionChart() {
  const [zObs, setZObs] = useState(1.5);

  const W = 560;
  const H = 220;
  const PAD = { top: 20, right: 30, bottom: 52, left: 30 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const xMin = -3.5;
  const xMax = 3.5;
  const yMax = normalPDF(0) * 1.12;

  const scaleX = (v: number) => PAD.left + ((v - xMin) / (xMax - xMin)) * plotW;
  const scaleY = (v: number) => PAD.top + plotH - (v / yMax) * plotH;

  const p = pValue(zObs);
  const significant = p < 0.05;
  const accentColor = significant ? "var(--accent)" : "var(--muted)";

  const curvePath = buildCurvePath(xMin, xMax, scaleX, scaleY);
  const shadedPath = buildShadedPath(zObs, scaleX, scaleY);

  const markerX = scaleX(zObs);
  const baselineY = scaleY(0);

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    setZObs(parseFloat(e.target.value));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "stretch" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {/* Shaded tails */}
        <path d={shadedPath} fill={accentColor} opacity={0.18} />

        {/* Baseline */}
        <line
          x1={PAD.left} y1={baselineY}
          x2={PAD.left + plotW} y2={baselineY}
          stroke="var(--border)" strokeWidth={1}
        />

        {/* Bell curve */}
        <path d={curvePath} fill="none" stroke="var(--foreground)" strokeWidth={2} />

        {/* Zero tick */}
        <line x1={scaleX(0)} y1={baselineY} x2={scaleX(0)} y2={baselineY + 4} stroke="var(--border)" strokeWidth={1} />
        <text x={scaleX(0)} y={baselineY + 14} textAnchor="middle" fontSize={11} fill="var(--muted)">0</text>

        {/* X axis label */}
        <text
          x={PAD.left + plotW / 2} y={H - 4}
          textAnchor="middle" fontSize={11} fill="var(--muted)"
        >Difference in means (standard errors)</text>

        {/* Observed marker */}
        <line
          x1={markerX} y1={PAD.top}
          x2={markerX} y2={baselineY}
          stroke={accentColor} strokeWidth={2}
        />
        <circle cx={markerX} cy={scaleY(normalPDF(zObs))} r={4} fill={accentColor} />

        {/* p-value label */}
        <text
          x={PAD.left + plotW - 8} y={PAD.top + 16}
          textAnchor="end" fontSize={13} fontFamily="var(--font-mono)" fill={accentColor}
        >p = {p < 0.001 ? "<0.001" : p.toFixed(3)}</text>

        {significant && (
          <text
            x={PAD.left + plotW - 8} y={PAD.top + 32}
            textAnchor="end" fontSize={10} fill={accentColor}
          >significant at 5%</text>
        )}
      </svg>

      {/* Slider */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0 0.25rem" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", whiteSpace: "nowrap" }}>
          Observed difference
        </span>
        <input
          type="range"
          min={0}
          max={3.5}
          step={0.05}
          value={zObs}
          onChange={handleSlider}
          style={{ flex: 1, accentColor: "var(--accent)" }}
          aria-label="Observed difference in standard errors"
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--foreground)", minWidth: "2.5rem", textAlign: "right" }}>
          {zObs.toFixed(2)}σ
        </span>
      </div>
    </div>
  );
}
