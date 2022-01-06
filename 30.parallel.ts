type Callback<T> = (error: Error | undefined, data: T | undefined) => void;

type AsyncFunc<T> = (callback: Callback<T>) => void;

function parallel<T>(funcs: AsyncFunc<T>[]) {
  return function (finalCallback: Callback<T[]>) {
    const result: T[] = [];
    let hasError = false;
    for (const func of funcs) {
      func((err, data) => {
        if (hasError) return;
        if (err) {
          hasError = true;
          return finalCallback(err, undefined);
        }
        result.push(data!);
        if (result.length === funcs.length) {
          return finalCallback(undefined, result);
        }
      });
    }
  };
}

function parallelPromise<T>(funcs: AsyncFunc<T>[]) {
  const promisify = (fn: AsyncFunc<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
      fn((error, data) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(data!);
      });
    });
  };
  return async function (finalCallback: Callback<T[]>) {
    const result: T[] = [];
    for (const func of funcs) {
      const promise = promisify(func);
      try {
        const data = await promise;
        result.push(data);
        if (result.length === funcs.length) {
          finalCallback(undefined, result);
        }
      } catch (err) {
        finalCallback(err as Error, undefined);
        break;
      }
    }
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
