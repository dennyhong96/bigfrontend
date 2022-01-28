type FunctionExtended = Function & {
  mycall: (thisArg: any, ...args: any[]) => any;
};

(Function.prototype as FunctionExtended).mycall = function (
  thisArg: any,
  ...args: any[]
) {
  thisArg = thisArg ?? window;
  thisArg = Object(thisArg);
  const func = Symbol();
  thisArg[func] = this;
  const res = thisArg[func](...args);
  delete thisArg[func];
  return res;
};

// Example
function test(a: string) {
  // @ts-ignore
  console.log(this);
  console.log(a);
}

// @ts-ignore
(test as FunctionExtended).mycall({}, "abc");
test.call({}, "abc");

export {};
