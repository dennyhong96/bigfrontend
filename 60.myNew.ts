const myNew = (
  constructor: new (...args: any[]) => object,
  ...args: any[]
): object => {
  // const context = Object.create(constructor.prototype);

  const context = {};
  Object.setPrototypeOf(context, constructor.prototype);

  const res = constructor.call(context, ...args);
  if (res !== undefined) {
    return res;
  }
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
