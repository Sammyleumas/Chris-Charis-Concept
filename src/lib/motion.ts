/**
 * Motion tokens for Motion (JS) animations, mirroring the CSS tokens in
 * globals.css. Use these instead of ad-hoc numbers.
 */
export const ease = {
  /** Slow out: arrivals, reveals */
  out: [0.22, 1, 0.36, 1] as const,
  /** Exits */
  in: [0.4, 0, 1, 1] as const,
  /** Slow in & slow out: moving between two states */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Follow-through: slight overshoot, then settles */
  settle: [0.34, 1.36, 0.64, 1] as const,
};

/** Seconds. Frequent interactions use the short end. */
export const duration = {
  tap: 0.07,
  fast: 0.15,
  base: 0.22,
  slow: 0.4,
  story: 0.7,
};
