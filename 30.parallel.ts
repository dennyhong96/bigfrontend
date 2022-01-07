type Callback<T> = (error: Error | undefined, data: T | undefined) => void;

type AsyncFunc<T> = (callback: Callback<T>) => void;

function parallel<T>(funcs: AsyncFunc<T>[]) {
  return function (finalCallback: Callback<T[]>) {
    const result: T[] = [];
    let resultCount = 0;
    let errorOccured = false;
    funcs.forEach((func, index) => {
      func((error, data) => {
        if (errorOccured) return;
        if (error) {
          errorOccured = true;
          return finalCallback(error, undefined);
        }
        result[index] = data!;
        resultCount++;
        if (resultCount === funcs.length) {
          return finalCallback(undefined, result);
        }
      });
    });
  };
}

function parallelPromise<T>(funcs: AsyncFunc<T>[]) {
  const promisify = (fn: AsyncFunc<T>): Promise<T> => {
    return new Promise((res, rej) => {
      fn((error, data) => {
        if (error) return rej(error);
        res(data!);
      });
    });
  };
  return function (finalCallback: Callback<T[]>) {
    const result: T[] = [];
    let resultCount = 0;
    let errorOccured = false;
    funcs.forEach((func, index) => {
      promisify(func)
        .then((data) => {
          if (errorOccured) return;
          result[index] = data;
          resultCount++;
          if (resultCount === funcs.length) {
            finalCallback(undefined, result);
          }
        })
        .catch((error) => {
          if (errorOccured) return;
          errorOccured = true;
          finalCallback(error, undefined);
        });
    });
  };
}

// Example
const async1 = (callback: Callback<number>) => {
  callback(undefined, 1);
};

const async2 = (callback: Callback<number>) => {
  callback(undefined, 2);
};

const async3 = (callback: Callback<number>) => {
  callback(undefined, 3);
};

const all = parallel([async1, async2, async3]);

all((error, data) => {
  console.log({ error }, { data });
});

export {};
