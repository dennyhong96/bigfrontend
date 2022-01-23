type Callback = (error: any, result: any | Thunk) => void;
type Thunk = (callback: Callback) => void;

function flattenThunk(thunk: Thunk) {
  return function flattenedThunk(finalCallback: Callback) {
    const runNextThunk = (thunk: Thunk) => {
      thunk((error: any, nextThunkOrResult: any | Thunk) => {
        if (error) {
          return finalCallback(error, undefined);
        } else {
          if (typeof nextThunkOrResult === "function") {
            return runNextThunk(nextThunkOrResult as Thunk);
          } else {
            return finalCallback(undefined, nextThunkOrResult as any);
          }
        }
      });
    };
    runNextThunk(thunk);
  };
}

// Example
const func1: Thunk = (cb: Callback) => {
  setTimeout(() => cb(undefined, "ok"), 10);
};
const func2: Thunk = (cb: Callback) => {
  setTimeout(() => cb(undefined, func1), 10);
};
const func3: Thunk = (cb: Callback) => {
  setTimeout(() => cb(undefined, func2), 10);
};
const flattenedThunk = flattenThunk(func3);
flattenedThunk((error: any, data: any) => {
  if (error) console.error(error);
  console.log(data); // 'ok'
});

export {};
