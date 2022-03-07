function all(promises: (any | Promise<any>)[]): Promise<any[]> {
  const results: any[] = [];
  let rejected = false;
  let resultsCount = 0; // we need a counter, cannot use results.length, becuase it could be sparse
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]); // promises array is empty, resolve with an empty array
    promises.forEach((promise, idx) => {
      // Convert non-promise element into a promsie so we can treat them equally
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
      }
      promise
        .then((res: any) => {
          if (rejected) return; // return when we had an error, promise is already rejected
          results[idx] = res; // results should be in the same order as promises
          if (++resultsCount === promises.length) {
            return resolve(results); // resolve when we have collected all of the results
          }
        })
        .catch((err: any) => {
          if (rejected) return; // return when we had an error, promise is already rejected
          rejected = true;
          return reject(rejected);
        });
    });
  });
}

// Example
all([1, 2, 3]).then((value) => {
  console.log(value);
});
