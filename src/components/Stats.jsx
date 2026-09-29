import { useState } from 'react'

const STATS = [
  { value: '58%', label: 'Increase in pick up point use', soft: '#ffc2b8', hard: '#ff5a4f' },
  { value: '23%', label: 'Decreased in customer phone calls', soft: '#ffe28a', hard: '#f5b800' },
  { value: '27%', label: 'Increase in pick up point use', soft: '#aeeedd', hard: '#14b89a' },
  { value: '40%', label: 'Decreased in customer phone calls', soft: '#d3c6ff', hard: '#7c5cff' },
]

export default function Stats({ onPick }) {
  const [active, setActive] = useState(0)

  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" aria-label="Impact statistics">
      {STATS.map((s, i) => {
        const on = active === i
        return (
          <li key={i} data-stat className="will-move">
            <button
              type="button"
              aria-pressed={on}
              aria-label={`${s.value} ${s.label}. Paint the car this color.`}
              onClick={() => { setActive(i); onPick?.(s.hard) }}
              style={{ backgroundColor: on ? s.hard : s.soft }}
              className={`block w-full rounded-2xl p-3 text-left transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_10px_0_-4px_rgba(20,19,15,0.18)] active:translate-y-0 sm:p-4 ${on ? 'text-white shadow-[0_10px_0_-4px_rgba(20,19,15,0.25)]' : 'text-ink'}`}
            >
              <span className="block font-display text-4xl font-extrabold leading-none sm:text-5xl md:text-6xl">{s.value}</span>
              <span className={`mt-2 block max-w-[18ch] text-xs leading-snug sm:text-sm ${on ? 'text-white/90' : 'text-ink/70'}`}>{s.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
