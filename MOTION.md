# Motion and interaction standard

How the Chris Charis Concept website moves and responds. Read this before adding any animation.

**Core principle:** make the experience beautiful, but never make visitors work harder to enjoy it.
**Critical rule:** the more often something is used, the less it animates. Frequent controls respond instantly; expressive motion is kept for occasional storytelling moments.

## Tokens

Defined once in `src/app/globals.css` (CSS) and `src/lib/motion.ts` (Motion/JS). Do not use ad-hoc durations or curves.

| Token | Value | Use |
| --- | --- | --- |
| tap | 70 ms | Press feedback (compress on press) |
| fast | 150 ms | Hover colour, small fades, menus (160 ms) |
| base | 220 ms | Drawer exit, field messages, photo crossfade |
| slow | 400 ms | Larger moves: drawer entry (300 ms), coverflow (520 ms) |
| story | 550 ms+ | Scroll reveals (550 ms), hero crossfade (1.4 s), counting numbers (2.2 s) |
| `--ease-out-soft` | `cubic-bezier(.22,1,.36,1)` | Arrivals and reveals (slow out) |
| `--ease-in-quick` | `cubic-bezier(.4,0,1,1)` | Exits: get out of the way fast |
| `--ease-in-out-soft` | `cubic-bezier(.65,0,.35,1)` | Moving between two states (slow in and out) |
| `--ease-settle` | `cubic-bezier(.34,1.36,.64,1)` | Follow-through: small overshoot, then settles |

Utilities: `tap` (buttons), `tap-soft` (large cards), `anim-menu`, `anim-dialog`, `anim-fade`, `anim-rise`, `anim-pop`, `anim-nudge`, `hit-y` (larger hit area for text links).

## Frequency tiers

| Tier | Examples | Motion |
| --- | --- | --- |
| **Constant** | Navigation links, section tabs, form fields, carousel arrows, filter chips | Colour change on hover; 70 ms press compression. No entrance animations |
| **Frequent** | Opening menus, page navigation, stepping through photos, submitting a form | 110–300 ms, simple fades and short movement |
| **Occasional** | Opening the gallery viewer, the mobile drawer, success and error messages | 220–420 ms with settle easing |
| **Storytelling** | Homepage hero slideshow, project reveals on scroll, 3D coverflow, counting numbers | 0.5–2.2 s, expressive but never blocking content |

## The 20 principles, applied

| # | Principle | Where |
| --- | --- | --- |
| 1 | Squash & stretch | `tap`: buttons compress to 96% in 70 ms and spring back with a slight overshoot; cards use `tap-soft` (98.5%). Nothing cartoonish |
| 2 | Anticipation | The centred coverflow card dips when pressed before the viewer opens; cards lift on hover before navigating; menus scale from 98.5% as they open |
| 3 | Staging | Hero overlay keeps the headline dominant; only the photo moves; side carousel cards are dimmed; no competing motion on content pages |
| 4 | Pose to pose | Every animation has a defined start and end state (keyframes in `globals.css`): menu, dialog, rise, pop, page in and out |
| 5 | Follow through | `--ease-settle` on press release, success tick, viewer opening and coverflow (`cubic-bezier(.25,1.12,.4,1)`): motion settles rather than stopping dead |
| 6 | Slow in & slow out | All reveals, carousel moves and the slideshow use the eased tokens; nothing is linear except progress bars |
| 7 | Moving in arcs | Coverflow cards move sideways while depth (`translateZ`) and rotation change, so they travel along a curve in 3D |
| 8 | Secondary action | Card image zoom on hover, arrow nudge on links, slide caption change: small, never more than the primary action |
| 9 | Snappy timing | Presses 70 ms, hovers 150 ms, menus 160 ms, page transitions about 300 ms in total |
| 10 | Exaggerated feedback | Error summary nudges once and lists each problem with a link to its field; success panel rises with a popping tick; field errors rise in; pending buttons show a spinner immediately |
| 11 | Solid drawing in 3D | One perspective for the whole coverflow; depth-consistent scale, shadow and dimming; rubber-band resistance at the ends |
| 12 | Overall appeal | One token set, one easing family, one press behaviour across the whole site |
| 13 | Fitts's law | Primary actions are large pill buttons in predictable places (Donate top right, CTAs under headings); arrows sit beside the counter they control |
| 14 | Bigger hit areas | Audited on all 37 pages: no target under 24 × 24 px (WCAG 2.5.8); phone controls are 44 px; text links use `hit-y` (36 px) without changing layout |
| 15 | Hick's law | Seven top-level menu items; Our Work grouped into five families; filters limited to the five project families; donation offers four presets plus custom |
| 16 | Miller's law | Content in groups of three to seven: five figures, four pathway stages, five families, five organisations, section tabs |
| 17 | Doherty threshold | Pages are pre-rendered and prefetched; presses respond in 70 ms; forms show a pending state at once; images and video never block content |
| 18 | Postel's law | Server accepts "₦25,000", "25k", mixed-case emails, "mailto:", links without https://, and extra spaces, then validates strictly; errors clear as soon as you correct the field |
| 19 | Jakob's law | Logo top left links home; navigation across the top; footer with links and legal; standard form layout with labels above fields; error summary pattern |
| 20 | Frequency of use | See the tiers above: constant controls never animate in; storytelling moments do |

## Accessibility and performance
- `prefers-reduced-motion`: CSS transitions and animations are reduced globally, Motion uses `MotionConfig reducedMotion="user"`, page transitions are off, the slideshow does not autoplay and numbers show their final value.
- Only `transform` and `opacity` are animated (GPU-friendly). No continuous decorative motion; the hero slideshow pauses on hover, focus, a hidden tab and the pause button.
- Content is never hidden behind an animation: final values are in the HTML, and reveals only start after content is already laid out.
