import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Stats from './Stats.jsx'
import AnimatedVisual from './AnimatedVisual.jsx'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = 'WELCOME ITZFIZZ'
const LETTER_COLORS = ['#ff5a4f', '#f59e0b', '#14b89a', '#3b82f6', '#7c5cff']

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // ---------- Full motion ----------
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Intro: letters, then stats one by one (opacity + transform only)
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-letter]', { opacity: 0, y: 24, duration: 0.8, stagger: 0.04 })
          .from('[data-stat]', { opacity: 0, y: 20, duration: 0.7, stagger: 0.15 }, '-=0.3')
          .from('[data-car]', { opacity: 0, duration: 0.8 }, '-=0.9')

        // Scroll: one scrubbed, pinned timeline. Values re-evaluated on resize.
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => '+=' + Math.round(window.innerHeight * 1.6),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        tl.fromTo(
          '[data-car]',
          { x: 0 },
          { x: () => window.innerWidth * 1.05 + 0, },
          0
        )
          .fromTo('[data-car]', { scale: 0.85 }, { scale: 1.05 }, 0)
          .to('[data-road]', { backgroundPositionX: () => -window.innerWidth * 1.2 }, 0)
          .to('[data-headline]', { y: -30, scale: 0.94, opacity: 0.55 }, 0)
          .to('[data-glow]', { x: () => window.innerWidth * 0.5, opacity: 0.9 }, 0)
        // Spin wheels about their hubs (rotate() about local 0,0 = axle; avoids GSAP SVG origin math)
        tl.to('[data-wheel]', { attr: { transform: 'rotate(1440)' } }, 0)
      })

      // ---------- Reduced motion: static, no pin, no scrub ----------
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-car]', { x: 0 })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-5 pb-8 pt-10 sm:px-8 md:px-12 md:pt-14"
      aria-labelledby="hero-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-[460px] w-[460px] rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(124,92,255,0.28), rgba(124,92,255,0))' }} />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-24 right-1/4 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(20,184,154,0.22), rgba(20,184,154,0))' }} />
      <div
        data-glow
        aria-hidden="true"
        style={{ background: "radial-gradient(closest-side, rgba(255,90,79,0.35), rgba(255,90,79,0))" }}
        className="will-move pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-60"
      />

      <div data-headline className="will-move relative z-10 text-center">
        <h1
          id="hero-title"
          aria-label="Welcome ItzFizz"
          className="font-display text-[clamp(2rem,11vw,4rem)] sm:text-[clamp(1.05rem,5.4vw,5.5rem)] font-extrabold leading-none"
        >
          <span aria-hidden="true" className="flex flex-col items-center whitespace-nowrap sm:flex-row sm:justify-center sm:gap-[0.5em]">
            {HEADLINE.split(' ').map((word, w) => (
              <span key={w} className="inline-flex">
                {word.split('').map((ch, i) => (
                  <span
                    key={i}
                    data-letter
                    style={{ color: LETTER_COLORS[(i + w * 2) % LETTER_COLORS.length] }}
                    className="will-move inline-block px-[0.07em] transition-colors duration-200 hover:!text-ink sm:px-[0.12em]"
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>
      </div>

      <div className="relative z-0 my-auto w-full" style={{ '--car-w': 'min(84vw, 880px)' }}>
        <div
          data-road
          aria-hidden="true"
          className="road-dash absolute inset-x-0 h-[3px] opacity-80"
          style={{ top: 'calc(var(--car-w) * 0.348)' }}
        />
        <div data-car className="will-move relative" style={{ width: 'var(--car-w)', transformOrigin: '50% 92%' }}>
          <AnimatedVisual />
        </div>
        <p className="mt-10 text-center text-xs text-ink/60 sm:text-sm">Tap a stat to repaint the car, then scroll to drive it.</p>
      </div>

      <div className="relative z-10">
        <Stats onPick={(c) => root.current?.style.setProperty('--car', c)} />
      </div>
    </section>
  )
}
