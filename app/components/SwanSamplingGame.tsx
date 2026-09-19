"use client";
import { useState, useCallback } from "react";

const TOTAL_SWANS = 100;

// Fixed positions spread through the grid so black swans aren't clumped
const BLACK_INDICES = new Set([13, 47, 71]);

const SAMPLE_SIZES = [5, 10, 25, 50];

const CELL = 40;
const GAP = 4;
const COLS = 10;

// Swan silhouette dimensions (fits inside CELL with padding)
// Body: ellipse cx=19 cy=18 rx=10 ry=7
// Neck: thick curved stroke from body left to head
// Head: small circle cx=6 cy=5 r=3.5
// Beak: tiny triangle pointing left
const SWAN_W = 30;
const SWAN_H = 26;
const PAD_X = (CELL - SWAN_W) / 2;
const PAD_Y = (CELL - SWAN_H) / 2;

function SwanIcon({
  isBlack,
  dimmed,
  highlighted,
}: {
  isBlack: boolean;
  dimmed: boolean;
  highlighted: boolean;
}) {
  const bodyFill = isBlack ? "#1a1a1a" : "#ffffff";
  const borderStroke = isBlack ? "#1a1a1a" : "#b0afa6";
  const alpha = dimmed ? 0.28 : 1;

  return (
    <g opacity={alpha}>
      {/* Highlight ring (rendered behind swan) */}
      {highlighted && (
        <rect
          x={-3}
          y={-3}
          width={SWAN_W + 6}
          height={SWAN_H + 6}
          rx={5}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2}
        />
      )}

      {/* Neck: thick curved stroke, same colour as fill — drawn before body so body covers the base */}
      <path
        d="M 10 18 C 7 14, 4 10, 6 5"
        stroke={bodyFill}
        strokeWidth={5.5}
        strokeLinecap="round"
        fill="none"
      />
      {/* Neck outline (thin border on the outside edges only) */}
      <path
        d="M 7.5 18 C 4.5 14, 1.5 10, 3.5 5"
        stroke={borderStroke}
        strokeWidth={1}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 12.5 17 C 9.5 13, 7 9.5, 8.5 5.5"
        stroke={borderStroke}
        strokeWidth={1}
        strokeLinecap="round"
        fill="none"
      />

      {/* Body */}
      <ellipse
        cx={19}
        cy={18}
        rx={10}
        ry={7}
        fill={bodyFill}
        stroke={borderStroke}
        strokeWidth={1}
      />

      {/* Head */}
      <circle
        cx={6}
        cy={5}
        r={3.5}
        fill={bodyFill}
        stroke={borderStroke}
        strokeWidth={1}
      />

      {/* Beak: tiny filled triangle pointing left */}
      <path
        d="M 3 4 L -1 5 L 3 6 Z"
        fill={borderStroke}
        stroke="none"
      />
    </g>
  );
}

export default function SwanSamplingGame() {
  const [sampleSize, setSampleSize] = useState(10);
  const [sampledIndices, setSampledIndices] = useState<Set<number> | null>(null);

  const sample = useCallback(() => {
    const indices = Array.from({ length: TOTAL_SWANS }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setSampledIndices(new Set(indices.slice(0, sampleSize)));
  }, [sampleSize]);

  const foundBlack =
    sampledIndices !== null &&
    [...sampledIndices].some((i) => BLACK_INDICES.has(i));
  const hasSampled = sampledIndices !== null;

  const rows = Math.ceil(TOTAL_SWANS / COLS);
  const gridW = COLS * CELL + (COLS - 1) * GAP;
  const gridH = rows * CELL + (rows - 1) * GAP;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
      <svg
        viewBox={`0 0 ${gridW} ${gridH}`}
        style={{ width: "100%", maxWidth: 460, height: "auto", display: "block" }}
        aria-label="Grid of 100 swans, 3 of which are black"
      >
        {Array.from({ length: TOTAL_SWANS }, (_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const x = col * (CELL + GAP) + PAD_X;
          const y = row * (CELL + GAP) + PAD_Y;
          const isBlack = BLACK_INDICES.has(i);
          const inSample = sampledIndices?.has(i) ?? false;
          const dimmed = hasSampled && !inSample;

          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <SwanIcon isBlack={isBlack} dimmed={dimmed} highlighted={inSample} />
            </g>
          );
        })}
      </svg>

      {/* Sample size controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            whiteSpace: "nowrap",
          }}
        >
          Sample size
        </span>
        {SAMPLE_SIZES.map((n) => (
          <button
            key={n}
            onClick={() => {
              setSampleSize(n);
              setSampledIndices(null);
            }}
            style={{
              padding: "0.3rem 0.75rem",
              fontSize: "0.85rem",
              fontFamily: "var(--font-mono)",
              border: "1px solid",
              borderColor: sampleSize === n ? "var(--accent)" : "var(--border)",
              borderRadius: 4,
              background: sampleSize === n ? "var(--accent)" : "transparent",
              color: sampleSize === n ? "#fff" : "var(--foreground)",
              cursor: "pointer",
            }}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        onClick={sample}
        style={{
          padding: "0.5rem 1.5rem",
          fontSize: "0.9rem",
          fontWeight: 600,
          border: "1px solid var(--foreground)",
          borderRadius: 4,
          background: "var(--foreground)",
          color: "var(--background)",
          cursor: "pointer",
          letterSpacing: "0.02em",
        }}
      >
        Sample {sampleSize} swans
      </button>

      {hasSampled && (
        <p
          style={{
            fontSize: "0.95rem",
            fontStyle: "italic",
            color: foundBlack ? "var(--accent)" : "var(--foreground)",
            margin: 0,
            textAlign: "center",
            maxWidth: 460,
          }}
        >
          {foundBlack
            ? "A black swan. Not all swans are white."
            : `All ${sampleSize} sampled swans are white — perhaps all swans are white?`}
        </p>
      )}
    </div>
  );
}
