import { Logo } from "@/components/ui/Logo";

/** Order in which the 12 tiles (4 × 3) disappear, so the reveal looks scattered. */
const ORDER = [5, 0, 9, 3, 7, 11, 1, 6, 10, 2, 8, 4];

/**
 * First-visit loader: a charcoal screen counts to 100%, then breaks into
 * tiles that vanish one by one to reveal the page.
 *
 * It is pure CSS (see globals.css), so it ends on time even before or
 * without JavaScript, and it never blocks clicks. A script in <head> marks
 * the page `data-preloaded` for the rest of the visit, and straight away
 * for people who prefer reduced motion, which hides it.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-tiles">
        {ORDER.map((step, i) => (
          <span key={i} style={{ animationDelay: `calc(var(--pre-reveal) + ${step * 38}ms)` }} />
        ))}
      </div>
      <div className="preloader-content">
        <Logo tone="light" className="h-9 w-auto opacity-80 sm:h-10" />
        <p className="preloader-count font-display" />
      </div>
    </div>
  );
}
