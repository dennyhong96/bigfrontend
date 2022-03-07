function any<T>(promises: Promise<T>[]): Promise<T> {
  const errors: any[] = [];
  let rejectedCount = 0;
  let resolved = false;

  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return reject(
        new AggregateError("No Promise in Promise.any was resolved")
      );
    }
    promises.forEach((promise, index) => {
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
      }
      promise
        .then((res) => {
          if (resolved) return;
          resolved = true;
          return resolve(res);
        })
        .catch((err) => {
          if (resolved) return;
          errors[index] = err; // errors should be in the same order as promises
          if (++rejectedCount === promises.length) {
            return reject(
              new AggregateError("No Promise in Promise.any was resolved")
            );
          }
        });
    });
  });
}

// Example:
any([
  Promise.reject("error1"),
  Promise.reject("error2"),
  Promise.reject("error3"),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
