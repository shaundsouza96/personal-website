"use client";
import { useState } from "react";

const N = 8;
const BASE_YIELD = 50;
const Y_LO = 10;
const Y_HI = 100;
const MAX_PLANT_H = 210;
const MIN_PLANT_H = 6;
const GROUND_Y = 275;

// Plant x-positions for each group
const CONTROL_XS = [22, 60, 98, 136, 174, 212, 250, 288];
const TREATED_XS = [392, 430, 468, 506, 544, 582, 620, 658];

function sampleNormal(n: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i += 2) {
    const u1 = Math.random() || 1e-10;
    const u2 = Math.random();
    const r = Math.sqrt(-2 * Math.log(u1));
    out.push(r * Math.cos(2 * Math.PI * u2));
    if (i + 1 < n) out.push(r * Math.sin(2 * Math.PI * u2));
  }
  return out;
}

function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p =
    d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.821256 + t * 1.3302744))));
  return z > 0 ? 1 - p : p;
}

function computePValue(control: number[], treated: number[]): number {
  const n = control.length;
  const meanC = control.reduce((s, x) => s + x, 0) / n;
  const meanT = treated.reduce((s, x) => s + x, 0) / n;
  const ssC = control.reduce((s, x) => s + (x - meanC) ** 2, 0);
  const ssT = treated.reduce((s, x) => s + (x - meanT) ** 2, 0);
  const pooledVar = (ssC + ssT) / (2 * n - 2);
  const se = Math.sqrt((2 * pooledVar) / n);
  if (se < 1e-10) return 1;
  const t = (meanT - meanC) / se;
  return 2 * normalCDF(-Math.abs(t));
}

function getReaction(p: number): { text: string; level: 0 | 1 | 2 | 3 } {
  if (p > 0.5) return { text: "Nah, this sh*t don't work.", level: 0 };
  if (p > 0.05) return { text: "Hard to say…", level: 1 };
  return { text: "This sh*t works!", level: 3 };
}

function yieldToHeight(y: number): number {
  const clamped = Math.max(Y_LO, Math.min(Y_HI, y));
  return MIN_PLANT_H + ((clamped - Y_LO) / (Y_HI - Y_LO)) * (MAX_PLANT_H - MIN_PLANT_H);
}

// Mouth SVG paths for the stick figure

function PlantStalk({
  x,
  plantH,
  tilt,
  stemColor,
  headFill,
}: {
  x: number;
  plantH: number;
  tilt: number;
  stemColor: string;
  headFill: string;
}) {
  const topX = x + tilt;
  const topY = GROUND_Y - plantH;
  // Intermediate points that follow the lean
  const f1 = 0.38;
  const f2 = 0.62;
  const l1x = x + tilt * f1;
  const l1y = GROUND_Y - plantH * f1;
  const l2x = x + tilt * f2;
  const l2y = GROUND_Y - plantH * f2;
  const headRy = Math.max(4, plantH * 0.11);

  return (
    <g>
      {/* Stem */}
      <line
        x1={x} y1={GROUND_Y}
        x2={topX} y2={topY}
        stroke={stemColor} strokeWidth={2.5} strokeLinecap="round"
      />
      {/* Grain head */}
      <ellipse
        cx={topX} cy={topY - headRy}
        rx={3.5} ry={headRy}
        fill={headFill} stroke="#8b6205" strokeWidth={1}
      />
      {/* Left leaf — only when tall enough */}
      {plantH > 28 && (
        <path
          d={`M ${l1x} ${l1y} Q ${l1x - 13} ${l1y - 5} ${l1x - 8} ${l1y - 15}`}
          stroke={stemColor} strokeWidth={2} fill="none" strokeLinecap="round"
        />
      )}
      {/* Right leaf */}
      {plantH > 46 && (
        <path
          d={`M ${l2x} ${l2y} Q ${l2x + 13} ${l2y - 4} ${l2x + 8} ${l2y - 14}`}
          stroke={stemColor} strokeWidth={2} fill="none" strokeLinecap="round"
        />
      )}
    </g>
  );
}

export default function JohnstonPlotsGame() {
  const [variation, setVariation] = useState(8);
  const [effect, setEffect] = useState(4);
  const [baseNoise, setBaseNoise] = useState<[number[], number[]]>(
    () => [sampleNormal(N), sampleNormal(N)]
  );

  const controlYields = baseNoise[0].map((n) => BASE_YIELD + n * variation);
  const treatedYields = baseNoise[1].map((n) => BASE_YIELD + effect + n * variation);
  const pValue = computePValue(controlYields, treatedYields);
  const { text: reactionText } = getReaction(pValue);

  const controlMean = controlYields.reduce((s, x) => s + x, 0) / N;
  const treatedMean = treatedYields.reduce((s, x) => s + x, 0) / N;
  const controlMeanH = yieldToHeight(controlMean);
  const treatedMeanH = yieldToHeight(treatedMean);

  const gapCenterX = (CONTROL_XS[N - 1] + TREATED_XS[0]) / 2; // midpoint of gap

  return (
    <div style={{ display: "flex", gap: "2rem", width: "100%", alignItems: "center" }}>

      {/* Left column: speech bubble + farmer image */}
      <div style={{ flexShrink: 0, width: "200px", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
        {/* Speech bubble above farmer, tail pointing down */}
        <div
          style={{
            position: "relative",
            background: "var(--panel)",
            border: "1.5px solid var(--border)",
            borderRadius: "12px",
            padding: "0.65rem 1rem",
            fontFamily: "var(--font-handwriting, Georgia, serif)",
            fontSize: "1rem",
            color: "var(--foreground)",
            textAlign: "center",
            width: "100%",
          }}
        >
          {reactionText}
          {/* Outer tail (border color) */}
          <span
            style={{
              position: "absolute",
              bottom: "-13px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "block",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "13px solid var(--border)",
            }}
          />
          {/* Inner tail (panel fill) */}
          <span
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "block",
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderTop: "11px solid var(--panel)",
            }}
          />
        </div>
        {/* Farmer image */}
        <img
          src="/farmer.png"
          alt="Farmer holding a bag of fertilizer"
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Right column: plant viz + sliders */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {/* Plant field visualization */}
        <svg
          viewBox="0 0 700 335"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {/* Soil beds */}
          <rect x={6} y={GROUND_Y} width={300} height={22} rx={3} fill="#7a5230" opacity={0.65} />
          <rect x={380} y={GROUND_Y} width={300} height={22} rx={3} fill="#7a5230" opacity={0.65} />

          {/* Dashed mean-height reference lines */}
          <line x1={6} y1={GROUND_Y - controlMeanH} x2={306} y2={GROUND_Y - controlMeanH} stroke="var(--muted)" strokeWidth={1.2} strokeDasharray="5 4" opacity={0.7} />
          <line x1={380} y1={GROUND_Y - treatedMeanH} x2={680} y2={GROUND_Y - treatedMeanH} stroke="var(--accent)" strokeWidth={1.2} strokeDasharray="5 4" opacity={0.7} />

          {/* Control plants */}
          {controlYields.map((y, i) => {
            const plantH = yieldToHeight(y);
            const tilt = (y - controlMean) * 0.55;
            return <PlantStalk key={i} x={CONTROL_XS[i]} plantH={plantH} tilt={tilt} stemColor="#5a8a3f" headFill="#c8930a" />;
          })}

          {/* Treated plants */}
          {treatedYields.map((y, i) => {
            const plantH = yieldToHeight(y);
            const tilt = (y - treatedMean) * 0.55;
            return <PlantStalk key={i} x={TREATED_XS[i]} plantH={plantH} tilt={tilt} stemColor="#3d8028" headFill="#e8aa1a" />;
          })}

          {/* Δ annotation in the gap */}
          {Math.abs(treatedMean - controlMean) > 1 && (
            <>
              <line x1={gapCenterX} y1={GROUND_Y - controlMeanH} x2={gapCenterX} y2={GROUND_Y - treatedMeanH} stroke="var(--foreground)" strokeWidth={1.5} strokeDasharray="4 3" />
              <line x1={gapCenterX - 5} y1={GROUND_Y - controlMeanH} x2={gapCenterX + 5} y2={GROUND_Y - controlMeanH} stroke="var(--foreground)" strokeWidth={1.5} />
              <line x1={gapCenterX - 5} y1={GROUND_Y - treatedMeanH} x2={gapCenterX + 5} y2={GROUND_Y - treatedMeanH} stroke="var(--foreground)" strokeWidth={1.5} />
              <text x={gapCenterX + 10} y={(GROUND_Y - controlMeanH + GROUND_Y - treatedMeanH) / 2} fontSize={11} fill="var(--foreground)" dominantBaseline="middle">
                +{(treatedMean - controlMean).toFixed(1)}
              </text>
            </>
          )}

          {/* Group labels */}
          <text x={156} y={325} textAnchor="middle" fontSize={12} fill="var(--muted)">Control</text>
          <text x={530} y={325} textAnchor="middle" fontSize={12} fill="var(--accent)">Treated (fertilized)</text>
        </svg>

        {/* Sliders + re-roll */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--muted)", marginBottom: "0.35rem" }}>
              <span>Natural variation (σ)</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>{variation}</span>
            </label>
            <input type="range" min={2} max={15} step={1} value={variation} onChange={(e) => setVariation(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--muted)", marginBottom: "0.35rem" }}>
              <span>Treatment effect (δ)</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>{effect}</span>
            </label>
            <input type="range" min={0} max={20} step={1} value={effect} onChange={(e) => setEffect(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
          </div>
          <button
            onClick={() => setBaseNoise([sampleNormal(N), sampleNormal(N)])}
            style={{ background: "none", border: "1px solid var(--border)", color: "var(--foreground)", padding: "0.35rem 0.75rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.82rem", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            New sample
          </button>
        </div>
      </div>

    </div>
  );
}
