export function throttle(func: (...args: any[]) => void, wait: number) {
  let timeout: number | null = null;
  let lastContext: [any, any[]] | null = null;
  return function (this: any, ...args: any[]) {
    if (timeout !== null) {
      // if during the wait period the func has been called, store the invocation context
      lastContext = [this, args];
      return;
    }
    func.call(this, ...args);
    timeout = setTimeout(() => {
      timeout = null;
      // Need to call func with stored invocation context as soon as the wait period ends
      // if during the wait period he func has been called
      if (lastContext !== null) {
        func.call(lastContext[0], ...lastContext[1]);
        lastContext = null;
      }
    }, wait);
  };
}
