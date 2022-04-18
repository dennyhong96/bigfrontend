type FunctionExtended = Function & {
  mycall: (thisArg: any, ...args: any[]) => any;
  myBind: (thisArg: any, ...args: any[]) => (...args: any[]) => void;
};

// The idea is to put the funciton into the context object as a method
// that way when we call context[funcKey] the `this` points the context object
// we need to wrap primitives into an object, or use window when no context passed in
(Function.prototype as FunctionExtended).mycall = function (
  thisArg: any,
  ...args: any[]
) {
  if (thisArg === null || thisArg === undefined) thisArg = window;
  if (typeof thisArg !== "object") thisArg = Object(thisArg);
  const funcKey = Symbol();
  thisArg[funcKey] = this;
  const invocationResult = thisArg[funcKey](...args);
  delete thisArg[funcKey];
  return invocationResult;
  // 1. need to assign the func(this) as a method of the thisArg object
  // 2. if no thisArg provided, need to default to the window object
  // 3. so when we invoke the func, this `this` context points to the thisArg
  // 4. we need to be able to delete the func from thisArg later
  // 5. so we need a unique key - create a Symbol
};

(Function.prototype as FunctionExtended).myBind = function (
  thisArg: any,
  ...args: any[]
) {
  if (thisArg === null || thisArg === undefined) thisArg = window;
  if (typeof thisArg !== "object") thisArg = Object(thisArg);
  const funcKey = Symbol();
  thisArg[funcKey] = this;
  return function (...moreArgs) {
    return thisArg[funcKey](...args, ...moreArgs);
  };
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
