import { gsap, ScrollTrigger } from "@/lib/gsap";
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

type ScrollRevealTriggerOptions = {
  start: string;
  y?: number;
  once?: boolean;
};

/**
 * Canonical GSAP ScrollTrigger reveal — gsap.from() on each target.
 * @see https://gsap.com/docs/v3/Plugins/ScrollTrigger/
 */
export function createScrollRevealTriggers(
  targets: HTMLElement[],
  options: ScrollRevealTriggerOptions,
): void {
  const { start, y = 36, once = true } = options;

  targets.forEach((target) => {
    gsap.from(target, {
      y,
      opacity: 0,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: {
        trigger: target,
        start,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });
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

/** Re-check viewport visibility after layout and ScrollTrigger refresh settle. */
export function scheduleViewportReveal(
  targets: HTMLElement[],
  revealRatio = 0.85,
): () => void {
  const reveal = () => revealTargetsInViewport(targets, revealRatio);
  const frameIds: number[] = [];

  const scheduleFrames = () => {
    reveal();
    frameIds.push(
      requestAnimationFrame(() => {
        reveal();
        frameIds.push(requestAnimationFrame(reveal));
      }),
    );
  };

  scheduleFrames();

  const onRefresh = () => reveal();
  ScrollTrigger.addEventListener("refresh", onRefresh);

  const timeoutId = window.setTimeout(reveal, 120);
  const lateTimeoutId = window.setTimeout(reveal, 400);

  return () => {
    frameIds.forEach((id) => cancelAnimationFrame(id));
    window.clearTimeout(timeoutId);
    window.clearTimeout(lateTimeoutId);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
  };
}
