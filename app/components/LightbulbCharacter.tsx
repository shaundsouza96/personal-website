export default function LightbulbCharacter({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 110 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={style}
    >
      {/* Top hat — crown */}
      <rect x={36} y={1} width={38} height={30} rx={3} fill="#2a2a2a" stroke="#191919" strokeWidth={3} />
      {/* Top hat — brim */}
      <rect x={24} y={28} width={62} height={10} rx={5} fill="#2a2a2a" stroke="#191919" strokeWidth={3} />

      {/* Body */}
      <circle cx={55} cy={88} r={50} fill="#FFE44D" stroke="#191919" strokeWidth={5} />

      {/* Bottom taper */}
      <path
        d="M41 133 Q55 152 69 133"
        fill="#FFE44D"
        stroke="#191919"
        strokeWidth={5}
        strokeLinecap="round"
      />

      {/* Eyes — looking to character's left (toward text on the right) */}
      <circle cx={40} cy={78} r={10} fill="white" stroke="#191919" strokeWidth={2.5} />
      <circle cx={46} cy={80} r={5} fill="#191919" />
      <circle cx={70} cy={78} r={10} fill="white" stroke="#191919" strokeWidth={2.5} />
      <circle cx={74} cy={80} r={5} fill="#191919" />

      {/* Tiny nose */}
      <ellipse cx={55} cy={101} rx={4} ry={3} fill="#191919" />

      {/* Moustache — two filled lobes */}
      <path
        d="M55 108
           C 52 104 42 103 35 108
           C 30 112 32 120 37 120
           C 44 120 52 112 55 108
           C 58 112 66 120 73 120
           C 78 120 80 112 75 108
           C 68 103 58 104 55 108
           Z"
        fill="#191919"
      />

      {/* Legs */}
      <rect x={37} y={148} width={13} height={22} rx={5} fill="#191919" />
      <rect x={60} y={148} width={13} height={22} rx={5} fill="#191919" />

      {/* Feet */}
      <rect x={30} y={162} width={20} height={9} rx={4} fill="#191919" />
      <rect x={60} y={162} width={20} height={9} rx={4} fill="#191919" />
    </svg>
  );
}
