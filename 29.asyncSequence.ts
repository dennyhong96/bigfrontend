type Callback<T> = (error: Error | undefined, data: T | undefined) => void;

type AsyncFunc<T> = (callback: Callback<T>, data: T) => void;

function sequence<T>(funcs: Array<AsyncFunc<T>>) {
  const funcsCopy = [...funcs];
  return function (finalCallback: Callback<T>, initialData: T) {
    const callback: Callback<T> = (error, nextData) => {
      if (error) return finalCallback(error, undefined);
      runNextFunc(nextData!);
    };
    const runNextFunc = (data: T) => {
      if (!funcsCopy.length) return finalCallback(undefined, data);
      const nextFunc = funcsCopy.shift()!;
      nextFunc(callback, data);
    };
    runNextFunc(initialData);
  };
}

function sequencePromise<T>(funcs: Array<AsyncFunc<T>>) {
  return function (finalCallback: Callback<T>, initialData: T) {
    const promisify = (fn: AsyncFunc<T>, data: T): Promise<T> => {
      return new Promise((resolve, reject) => {
        fn((error, newData) => {
          if (error) return reject(error);
          resolve(newData!);
        }, data);
      });
    };
    const finalPromise = funcs.reduce((acc, currFunc) => {
      return acc.then((newData) => {
        return promisify(currFunc, newData);
      });
    }, Promise.resolve(initialData));
    finalPromise
      .then((result) => finalCallback(undefined, result))
      .catch((error) => finalCallback(error, undefined));
  };
}

// Example
const asyncTimes2 = (callback: Callback<number>, num: number) => {
  setTimeout(() => callback(undefined, num * 2), 100);
};
const asyncTimes4 = sequence([asyncTimes2, asyncTimes2]);
asyncTimes4((error, data) => {
  console.log(data); // 4
}, 1);
