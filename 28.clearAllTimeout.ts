const originalSetTimeout = window.setTimeout.bind(window);
const timerIds = new Set<number>();

window.setTimeout = function (callback, delay) {
  const timeoutId = originalSetTimeout(callback, delay);
  timerIds.add(timeoutId);
  return timeoutId;
};

// Path window.setTimeout, store all timeoutIds into a set
export function clearAllTimeout() {
  for (const timeoutId of timerIds) {
    window.clearTimeout(timeoutId);
  }
}

function clearAllTimeout1() {
  let timeoutId = window.setTimeout(() => null, 0);
  while (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId--;
  }
}
