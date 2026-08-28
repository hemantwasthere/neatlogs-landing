const headerOffset = 76;

function tween(resolveTarget: () => number) {
  const start = window.scrollY;

  if (Math.abs(resolveTarget() - start) < 2) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: resolveTarget(), behavior: "instant" });
    return;
  }

  const duration = Math.min(900, 340 + Math.abs(resolveTarget() - start) * 0.09);
  const startedAt = performance.now();

  const step = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const target = resolveTarget();

    window.scrollTo({
      top: Math.round(start + (target - start) * eased),
      behavior: "instant",
    });

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function scrollToTop() {
  tween(() => 0);
}

export function scrollToSection(id: string) {
  const section = document.getElementById(id);

  if (!section) return false;

  tween(
    () => section.getBoundingClientRect().top + window.scrollY - headerOffset,
  );

  return true;
}
