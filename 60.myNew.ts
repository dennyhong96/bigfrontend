// when constructor function is invoked with the `new` operator
// it first creates an empty `this` object
// it links this.__proto__ to the constructor function's prototype
// it executes the constructor function
// if the constructor function doesn't return explicitely, it returns the `this` -> becomes the instance object

const myNew = (
  constructor: new (...args: any[]) => object,
  ...args: any[]
): object => {
  const context = {};
  Object.setPrototypeOf(context, constructor.prototype);
  // context.__proto__ = constructor.prototype

  const res = constructor.call(context, ...args);
  if (res !== undefined) return res; // if constructor returns something, return that

  // Otherwise, return the context
  return context;
};

// Example
function BigFrontEnd(this: { name: string }, name: string) {
  this.name = name;
}
BigFrontEnd.prototype.code = function () {};
BigFrontEnd.prototype.answer = function () {};
BigFrontEnd.prototype.design = function () {};

// @ts-ignore
const obj = myNew(BigFrontEnd, "dev");
console.log(obj);

export {};
