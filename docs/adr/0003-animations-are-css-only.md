# Animations are CSS only

The public site uses no JavaScript animation library. Moving between routes animates through React's `<ViewTransition>` in each page. Everything else is CSS: keyframes and transitions, elements kept mounted so they can transition out (the main menu on mobile), and `tw-animate-css` for Radix menus, whose exit animation Radix waits on before unmounting. One easing and the 150ms default live in `@theme`; the only other durations are 250ms and 400ms.

## Considered Options

- **Keep motion.** After the CSS move in #29, it only drove the mobile main menu's exit fade, the menu icon and one underline. Even split behind `LazyMotion`, that's a JavaScript chunk for three effects CSS can do, and an unsplit `motion` import had already slipped back in.
- **Switch to anime.js.** It drives animations from JavaScript and has no React exit (`AnimatePresence`) or shared-layout equivalent, so we'd have to write both in effects. It costs about the same, for effects CSS can do.

## Consequences

- An animation that CSS truly can't do (physics, gesture-driven drag) means revisiting this decision, not quietly adding a library.
- Browsers without View Transitions switch routes instantly. That's accepted: the content is the same, only the motion is missing.
