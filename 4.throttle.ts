export function throttle(func: (...args: any[]) => void, wait: number) {
  let timeoutId: number | null = null;
  let context: [any, any[]] | null = null;

  let timeout = () => {
    timeoutId = setTimeout(() => {
      timeoutId = null;

      // at the end of each timeout, we need to check if we have stored a invokation context
      // which means we called throttled func during the timeout
      // if we have a invokation context, we need to call throttled func with it, and enter timeout again
      if (context) {
        func.call(context[0], ...context[1]);
        context = null;
        timeout(); // need to call timeout again, to prevent another call happened immediately after we invoked func with last invokation context
      }
    }, wait);
  };

  return function throttled(this: any, ...args: any[]) {
    if (timeoutId === null) {
      func.call(this, ...args);
      timeout();
    } else {
      context = [this, args]; // store the invokation conetxt
    }
  };
}
