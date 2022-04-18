export function animateRight(
  element: HTMLElement,
  duration: number,
  distance: number
): void {
  const startTime = Date.now();
  const intervalId = setInterval(() => {
    const currTime = Date.now();
    const pct = (currTime - startTime) / duration;

    // stops when progress is at or over 1
    if (pct >= 1) {
      clearInterval(intervalId);
      return;
    }

    const moveBy = distance * pct;
    element.style.transform = `translateX(${moveBy}px)`; // use transform instead of margin to improve perf
  }, 25);
}
