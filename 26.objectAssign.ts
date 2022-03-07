function objectAssign(target: any, ...sources: any[]): any {
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
    if (source === null || source === undefined) continue; // skip null and undefined sources

    // Loop throught every enumerable key value pairs
    const keys = [
      ...Object.keys(source), // handle string enumerable keys
      ...Object.getOwnPropertySymbols(source), // Symbold properties can also be enumerable
    ];
    for (const key of keys) {
      // The key might be already on the target, we need to overwrite it with new value
      // need to check if key in target is writable, it might now be wriatble when created through Object.defineProperty or Object.create
      const keyDescriptor = Object.getOwnPropertyDescriptor(target, key);
      if (keyDescriptor && !keyDescriptor.writable) {
        throw new Error(`Target property ${key.toString()} is not writable.`);
      }

      // Set key value pairs on target
      target[key] = source[key];
    }
  }
  return target;
}
