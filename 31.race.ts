type Callback<T> = (error: Error | undefined, data: T | undefined) => void;

type AsyncFunc<T> = (callback: Callback<T>) => void;

function race<T>(funcs: AsyncFunc<T>[]) {
  return function (finalCallback: Callback<T>) {
    let hasWinner = false;
    funcs.forEach((func) => {
      func((error, data) => {
        if (hasWinner) return;
        hasWinner = true;
        if (error) return finalCallback(error, undefined);
        return finalCallback(undefined, data);
      });
    });
  };
}

function racePromise<T>(funcs: AsyncFunc<T>[]) {
  const promisify = (fn: AsyncFunc<T>): Promise<T | undefined> => {
    return new Promise((res, rej) => {
      fn((error, data) => {
        if (error) return rej(error);
        res(data);
      });
    });
  };

  return function (finalCallback: Callback<T>) {
    let hasWinner = false;
    funcs.map(promisify).forEach((promise) => {
      promise
        .then((data) => {
          if (hasWinner) return;
          hasWinner = true;
          finalCallback(undefined, data);
        })
        .catch((error) => {
          if (hasWinner) return;
          hasWinner = true;
          finalCallback(error, undefined);
        });
    });
  };
}

// Example
const async1 = (callback: Callback<number>) => {
  setTimeout(() => callback(undefined, 1), 300);
};

const async2 = (callback: Callback<number>) => {
  setTimeout(() => callback(undefined, 2), 100);
};

const async3 = (callback: Callback<number>) => {
  setTimeout(() => callback(undefined, 3), 200);
};

const first = race([async1, async2, async3]);

first((error, data) => {
  console.log(data); // 2, since 2 is the first to be given
});
