# Animations are CSS only

The public site uses no JavaScript animation library. Moving between routes animates through React's `<ViewTransition>` in each page. Everything else is CSS: keyframes and transitions, elements kept mounted so they can transition out (the main menu on mobile), and `tw-animate-css` for Radix menus, whose exit animation Radix waits on before unmounting. Two easings and the 150ms default live in `@theme`: `ease-smooth`, the default, front-loads the change and suits motion; `ease-fade` is symmetric and suits a colour cross-fading between two states, which `ease-smooth` makes look like a snap. The only other durations are 250ms and 400ms.

## Considered Options

- **Keep motion.** After the CSS move in #29, it only drove the mobile main menu's exit fade, the menu icon and one underline. Even split behind `LazyMotion`, that's a JavaScript chunk for three effects CSS can do, and an unsplit `motion` import had already slipped back in.
- **Switch to anime.js.** It drives animations from JavaScript and has no React exit (`AnimatePresence`) or shared-layout equivalent, so we'd have to write both in effects. It costs about the same, for effects CSS can do.

## Consequences

- An animation that CSS truly can't do (physics, gesture-driven drag) means revisiting this decision, not quietly adding a library.
- Browsers without View Transitions switch routes instantly. That's accepted: the content is the same, only the motion is missing.

## Amendment: charts animate in JavaScript (November 2026)

The Chart block is the one exception. Recharts (through shadcn/ui's chart) draws its lines and bars in with its own JavaScript animation, which CSS can't reproduce on marks Recharts lays out itself. The exception stays inside the Chart block: `ChartOnView` mounts the chart the first time it scrolls into view, so the 800ms draw-in plays once, where the reader sees it. Recharts' `isAnimationActive` stays at its default, `"auto"`, which skips the animation when the reader asks for reduced motion. Everything else on the site still animates in CSS.
