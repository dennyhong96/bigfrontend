type AllSettedResult =
  | { status: "fulfilled"; value: any }
  | { status: "rejected"; reason: any };

function allSettled(
  promises: (any | Promise<any>)[]
): Promise<AllSettedResult[]> {
  const results: AllSettedResult[] = [];
  let resultsCount = 0; // we need a counter, cannot use results.length, becuase it could be sparse

  return new Promise((resolve) => {
    if (!promises.length) return resolve([]); // promises array is empty, resolve with an empty array

    const checkIfFinished = () => {
      if (++resultsCount === promises.length) {
        return resolve(results); // resolve when we have collected all of the results
      }
    };

    promises.forEach((promise, index) => {
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
      }
      promise
        .then((res: any) => {
          results[index] = {
            status: "fulfilled",
            value: res,
          }; // results should be in the same order as promises
          checkIfFinished();
        })
        .catch((err: any) => {
          results[index] = {
            status: "rejected",
            reason: err,
          }; // results should be in the same order as promises
          checkIfFinished();
        });
    });
  });
}

// Example
const promises = [
  Promise.reject("error1"),
  Promise.resolve(1),
  Promise.reject("error2"),
  Promise.resolve(2),
  Promise.reject("error3"),
  Promise.resolve(3),
];

allSettled(promises).then(console.log);
