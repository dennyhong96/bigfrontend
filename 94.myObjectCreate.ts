export function myObjectCreate(proto: any): object {
  if (typeof proto !== "object" || proto === null) {
    throw new Error("proto must be an object");
  }

  function Constructor() {}
  Constructor.prototype = proto;
  // @ts-ignore
  // A constructor function's prototype is what the __proto__ links to on the instances
  return new Constructor();
}

export function myObjectCreate2(proto: any): object {
  if (typeof proto !== "object" || proto === null) {
    throw new Error("proto must be an object");
  }
  const obj = {};
  Object.setPrototypeOf(obj, proto);
  // obj.__proto__ = proto
  return obj;
}
