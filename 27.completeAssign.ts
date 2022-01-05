function completeAssign(target: any, ...sources: any[]): object {
  if (target === null || target === undefined) {
    throw new Error("Target cannot be null or undefined");
  }
  if (["string", "number", "boolean"].includes(typeof target)) {
    target = Object(target);
  }
  for (const source of sources) {
    if (source === undefined || source === null) continue;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
    const propDescriptors = Object.getOwnPropertyDescriptors(source);
    Object.defineProperties(target, propDescriptors);
  }
  return target;
}
