type Callback<T> = (error: Error | undefined, data: T | undefined) => void;

type AsyncFunc<T> = (callback: Callback<T>, data: T) => void;

function sequence<T>(asyncFns: Array<AsyncFunc<T>>) {
  return function (finalCallback: Callback<T>, initialData: T) {
    const callback: Callback<T> = (error, nextData) => {
      if (error) return finalCallback(error, undefined);
      runNextAsyncFn(nextData!);
    };
    const runNextAsyncFn = (data: T) => {
      if (!asyncFns.length) return finalCallback(undefined, data);
      const nextFunc = asyncFns.shift()!;
      nextFunc(callback, data);
    };
    runNextAsyncFn(initialData);
  };
}

function sequencePromise<T>(asyncFns: Array<AsyncFunc<T>>) {
  return function (finalCallback: Callback<T>, initialData: T) {
    const promisify = (asyncFn: AsyncFunc<T>, data: T): Promise<T> => {
      return new Promise((resolve, reject) => {
        asyncFn((error, nextData) => {
          if (error) return reject(error);
          resolve(nextData!);
        }, data);
      });
    };
    const finalPromise = asyncFns.reduce((dataPromise, asyncFn) => {
      return dataPromise.then((nextData) => {
        return promisify(asyncFn, nextData);
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

export {};
