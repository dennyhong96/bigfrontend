export function debounce(func: (...args: any[]) => any, wait: number) {
  let timeoutId: number | null = null;
  return function (this: any, ...args: any[]) {
    // timeoutId is set when debounced func is invoked again within the wait period
    // we need to clear the last timeout, so that the func won't be called
    if (timeoutId !== null) clearTimeout(timeoutId);
    // then we need to set up another timeout and store its timeoutId
    timeoutId = setTimeout(() => {
      func.call(this, ...args);
      timeoutId = null;
    }, wait);
  };
}
