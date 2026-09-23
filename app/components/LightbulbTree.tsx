export default function LightbulbTree() {
  return (
    <svg
      viewBox="0 0 580 520"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Trunk */}
      <path
        d="M258 460 C252 440 248 410 246 385 L334 385 C332 410 328 440 322 460 Z"
        fill="white"
        stroke="#191919"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Trunk base widening */}
      <path
        d="M240 460 C244 455 252 452 258 460 L322 460 C328 452 336 455 340 460"
        stroke="#191919"
        strokeWidth={7}
        strokeLinecap="round"
      />
      {/* Trunk texture ticks */}
      <line x1="256" y1="420" x2="268" y2="412" stroke="#191919" strokeWidth={5} strokeLinecap="round" />
      <line x1="312" y1="430" x2="324" y2="422" stroke="#191919" strokeWidth={5} strokeLinecap="round" />

      {/* Canopy — cloud shape */}
      <path
        d="
          M290 90
          C270 78 240 82 225 100
          C205 92 180 98 168 118
          C148 112 128 130 128 155
          C108 162 96 186 106 208
          C90 220 88 248 104 262
          C96 278 100 300 118 310
          C114 330 124 352 144 358
          C150 378 172 390 196 384
          C208 400 232 406 254 396
          C268 412 294 414 312 402
          C330 416 358 412 370 396
          C394 404 418 392 426 372
          C448 374 466 356 462 334
          C482 322 486 296 472 280
          C488 264 486 236 470 224
          C482 206 478 180 460 168
          C460 144 440 126 418 130
          C406 110 382 102 360 112
          C346 92 318 82 290 90
          Z
        "
        fill="white"
        stroke="#191919"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lightbulb: top-center (290, 155) */}
      <Bulb cx={290} cy={168} />

      {/* Lightbulb: upper-left (185, 200) */}
      <Bulb cx={185} cy={212} />

      {/* Lightbulb: upper-right (390, 205) */}
      <Bulb cx={390} cy={218} />

      {/* Lightbulb: lower-left (220, 300) */}
      <Bulb cx={220} cy={312} />

      {/* Lightbulb: lower-right (360, 305) */}
      <Bulb cx={360} cy={318} />
    </svg>
  );
}

function Bulb({ cx, cy }: { cx: number; cy: number }) {
  const r = 28;
  return (
    <g>
      {/* Screw cap */}
      <rect
        x={cx - 10}
        y={cy - r - 14}
        width={20}
        height={14}
        rx={3}
        fill="#555"
        stroke="#191919"
        strokeWidth={2.5}
      />
      {/* Cap lines */}
      <line x1={cx - 10} y1={cy - r - 10} x2={cx + 10} y2={cy - r - 10} stroke="#191919" strokeWidth={2} />
      <line x1={cx - 10} y1={cy - r - 6} x2={cx + 10} y2={cy - r - 6} stroke="#191919" strokeWidth={2} />

      {/* Bulb body */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#FFE44D"
        stroke="#191919"
        strokeWidth={3.5}
      />
      {/* Bulb bottom taper */}
      <path
        d={`M${cx - 12} ${cy + r - 4} Q${cx} ${cy + r + 14} ${cx + 12} ${cy + r - 4}`}
        fill="#FFE44D"
        stroke="#191919"
        strokeWidth={3.5}
        strokeLinecap="round"
      />

      {/* Filaments */}
      <path
        d={`M${cx - 6} ${cy - 6} Q${cx - 2} ${cy + 2} ${cx - 6} ${cy + 10}`}
        stroke="#191919"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M${cx + 6} ${cy - 6} Q${cx + 2} ${cy + 2} ${cx + 6} ${cy + 10}`}
        stroke="#191919"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}
