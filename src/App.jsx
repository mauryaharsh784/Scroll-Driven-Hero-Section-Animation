import Hero from './components/Hero.jsx'

export default function App() {
  return (
    <main>
      <Hero />
      <section className="bg-gradient-to-b from-cream to-[#ffe3da] px-6 py-28 md:py-40" aria-labelledby="story-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="story-title" className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
            Smooth motion should support the story, not distract from it.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
            Once the car has crossed the screen, the hero releases and the page scrolls
            like any other. Every movement above was tied to your scroll position, so
            scrolling back up drives the car back home.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
            Only transforms and opacity are animated, which keeps the work on the
            compositor and the scroll feeling light.
          </p>
        </div>
      </section>
      <footer className="border-t border-ink/15 px-6 py-10 text-center text-sm text-ink/60">
        Built with React, Tailwind CSS, GSAP and ScrollTrigger.
      </footer>
    </main>
  )
}
