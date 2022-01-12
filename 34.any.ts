function any<T>(promises: Promise<T>[]): Promise<T> {
  let result: T;
  let errors: any = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          if (result) return;
          result = res;
          return resolve(result);
        })
        .catch((err) => {
          if (result) return;
          errors[index] = err;
          if (errors.length === promises.length) {
            return reject(
              new AggregateError(
                "No Promise in Promise.any was resolved",
                errors
              )
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
