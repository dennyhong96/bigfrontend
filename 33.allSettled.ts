type AllSettedResult =
  | { status: "fulfilled"; value: any }
  | { status: "rejected"; reason: any };

function allSettled(
  promises: (any | Promise<any>)[]
): Promise<AllSettedResult[]> {
  const results: AllSettedResult[] = [];
  let resultCount = 0;
  return new Promise((resolve) => {
    if (!promises.length) return resolve([]);
    const checkIfFinished = () => {
      resultCount++;
      if (resultCount === promises.length) {
        return resolve(results);
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
          };
          checkIfFinished();
        })
        .catch((err: any) => {
          results[index] = {
            status: "rejected",
            reason: err,
          };
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
