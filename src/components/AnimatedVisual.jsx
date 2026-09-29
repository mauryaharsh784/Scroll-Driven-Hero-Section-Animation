// Local SVG car. Wheel groups carry data-wheel so Hero can spin them with scroll.
export default function AnimatedVisual() {
  return (
    <svg
      viewBox="0 0 620 230"
      role="img"
      aria-label="Illustration of a sports car driving across the screen"
      className="block h-auto w-full"
    >
      <ellipse cx="310" cy="216" rx="270" ry="8" fill="#14130f" opacity="0.18" />
      <path
        d="M40 156 C40 128 68 118 118 110 L188 66 C204 55 222 50 244 50 L392 50 C418 50 434 58 450 76 L488 110 C540 114 578 124 580 152 L580 172 L40 172 Z"
        style={{ fill: 'var(--car, #ff5a4f)' }}
      />
      <path d="M204 72 L246 62 L318 62 L318 108 L160 108 Z" fill="#f3efe6" opacity="0.9" />
      <path d="M332 62 L392 62 C404 62 412 66 420 76 L448 108 L332 108 Z" fill="#f3efe6" opacity="0.9" />
      <path d="M60 140 H100 M520 136 H566" stroke="#c9c2b0" strokeWidth="5" strokeLinecap="round" />
      <rect x="548" y="128" width="30" height="10" rx="5" fill="#f3efe6" />
      {[160, 456].map((cx) => (
        <g key={cx} transform={`translate(${cx} 172)`}>
          <circle r="40" fill="#f3efe6" />
          {/* Wheel is drawn around its own (0,0) hub, so GSAP rotates it exactly about the axle */}
          <g data-wheel transform="rotate(0)">
            <circle r="34" fill="#14130f" />
            <circle r="18" fill="#c9c2b0" />
            {[0, 60, 120].map((a) => (
              <line key={a} x1="-30" y1="0" x2="30" y2="0" stroke="#14130f" strokeWidth="4" transform={`rotate(${a})`} />
            ))}
            <circle r="5" fill="#14130f" />
            <circle cx="26" r="4" fill="#f3efe6" />
          </g>
        </g>
      ))}
    </svg>
  )
}
