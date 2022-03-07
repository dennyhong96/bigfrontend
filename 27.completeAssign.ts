export function completeAssign(target: any, ...sources: any[]): object {
  // Should throw error when target is null or undefined
  if (target === null || target === undefined) {
    throw new Error("Target cannot be null or undefined");
  }
  // Should wrap string, boolean, and number target
  if (["string", "boolean", "number"].includes(typeof target)) {
    target = Object(target);
  }

  // Loop through every source
  for (const source of sources) {
    if (source === undefined || source === null) continue; // skip null and undefined sources

    // the idea is to re-use every source's propertyDescriptors when we call defineProperties on the target
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
    const propDescriptors = Object.getOwnPropertyDescriptors(source);
    Object.defineProperties(target, propDescriptors);
  }

  return target;
}
