function all(promises: (any | Promise<any>)[]): Promise<any[]> {
  const results: any[] = [];
  let error: any = null;
  let resultCount = 0;
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);
    promises.forEach((promise, idx) => {
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
      }
      promise
        .then((res: any) => {
          if (error) return;
          results[idx] = res;
          resultCount++;
          if (resultCount === promises.length) {
            return resolve(results);
          }
        })
        .catch((err: any) => {
          if (error) return;
          error = err;
          return reject(error);
        });
    });
  });
}

// Example
all([1, 2, 3]).then((value) => {
  console.log(value);
});
