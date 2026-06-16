import { gsap } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/constants";

type RevealBatchOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
};

/** Timeline-based batch reveal — transform + opacity only for compositor performance. */
export function animateRevealBatch(
  batch: gsap.TweenTarget,
  options: RevealBatchOptions = {},
) {
  const { y = 0, duration = DURATION.base, stagger = 0.08 } = options;

  return gsap
    .timeline({ defaults: { ease: EASE.out, overwrite: "auto" } })
    .to(batch, {
      y,
      opacity: 1,
      duration,
      stagger,
    });
}

/** Immediately show targets already inside the viewport (no scroll trigger needed). */
export function revealTargetsInViewport(
  targets: HTMLElement[],
  revealRatio = 0.85,
): void {
  if (!targets.length || typeof window === "undefined") return;

  const revealThreshold = window.innerHeight * revealRatio;

  targets.forEach((item) => {
    const { top, bottom } = item.getBoundingClientRect();
    if (top < revealThreshold && bottom > 0) {
      gsap.set(item, { y: 0, opacity: 1, clearProps: "transform" });
    }
  });
}

/** Re-check viewport visibility after layout and scroll setup settle. */
export function scheduleViewportReveal(
  targets: HTMLElement[],
  revealRatio = 0.85,
): () => void {
  const reveal = () => revealTargetsInViewport(targets, revealRatio);

  reveal();

  const frameA = requestAnimationFrame(() => {
    reveal();
    requestAnimationFrame(reveal);
  });

  return () => cancelAnimationFrame(frameA);
}
