export function lenisScrollTo(target: string | HTMLElement | number) {
  const lenis = (window as any).__lenis;
  if (lenis) {
    if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el) lenis.scrollTo(el);
    } else {
      lenis.scrollTo(target);
    }
  } else {
    if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  }
}
