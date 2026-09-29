# Scroll-Driven Hero Animation

A hero section where a car drives across the screen as you scroll. The motion is tied to scroll position with GSAP ScrollTrigger (scrub), so scrolling down advances it and scrolling up reverses it.

## Tech stack

React 18, Vite, Tailwind CSS 3, GSAP + ScrollTrigger. Fonts (Bricolage Grotesque, DM Sans) are self-hosted through `@fontsource`, so nothing loads from a CDN.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # optional: serve the production build
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the project and publishes `dist/` to the `gh-pages` branch. Then set Settings → Pages → Source to the `gh-pages` branch. The Vite `base` is `./`, so it works under any repository name.

## Structure

```
src/
  components/
    Hero.jsx            pinned hero, intro + scroll timelines
    Stats.jsx           the four impact statistics
    AnimatedVisual.jsx  inline SVG car
  App.jsx
  main.jsx
  index.css
public/assets/
```

## Notes

- Only `transform` and `opacity` (plus the road's background position) are animated.
- `prefers-reduced-motion: reduce` disables the intro, pinning and scrubbing; the content stays fully visible.
- No timers or scroll listeners are used; ScrollTrigger owns all scroll-linked motion.
