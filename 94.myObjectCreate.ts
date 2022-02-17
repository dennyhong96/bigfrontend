export function myObjectCreate(proto: any): object {
  if (typeof proto !== "object" || proto === null) throw new Error();
  const obj = {};
  Object.setPrototypeOf(obj, proto);
  // obj.__proto__ = proto
  return obj;
}
