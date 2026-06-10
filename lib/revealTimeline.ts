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
