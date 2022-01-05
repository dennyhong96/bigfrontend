function pipe<T>(funcs: Array<(arg: T) => T>) {
  return function (arg: T): T {
    return funcs.reduce((res, func) => {
      return func(res);
    }, arg);
  };
}
