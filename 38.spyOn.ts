function spyOn(obj: Record<string, any>, methodName: string) {
  const originalMethod = obj[methodName];
  if (!originalMethod && typeof originalMethod !== "function") {
    throw new Error();
  }
  const calls: any[][] = [];
  obj[methodName] = function (...args: any[]) {
    calls.push(args);
    originalMethod.call(this, ...args);
  };
  return { calls };
}

// Example
const obj = {
  data: 1,
  increment(num: number) {
    this.data += num;
  },
};
const spy = spyOn(obj, "increment");
obj.increment(1);
console.log(obj.data); // 2
obj.increment(2);
console.log(obj.data); // 4
console.log(spy.calls);
