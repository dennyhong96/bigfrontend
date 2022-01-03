function objectAssign(target: any, ...sources: any[]): object {
  if (target === null || target === undefined) {
    throw new Error("Target cannot be null or undefined");
  }
  // Number, String and Boolean target are wrapped
  if (["number", "string", "boolean"].includes(typeof target)) {
    target = Object(target);
  }
  for (const source of sources) {
    if (source === null || source === undefined) continue;
    const keys = [
      ...Object.keys(source), // symbol keys are omitted when iterated, need to use Object.getOwnPropertySymbols
      ...Object.getOwnPropertySymbols(source).filter(
        (symbolKey) =>
          Object.getOwnPropertyDescriptor(source, symbolKey)!.enumerable
      ),
    ];
    for (const key of keys) {
      // check if a prop is writable
      const propDescriptor = Object.getOwnPropertyDescriptor(target, key); // returns an object describing the configuration of a specific property on a given object
      if (propDescriptor && !propDescriptor.writable) {
        throw new Error(`Target property "${String(key)}" is not writable`);
      }
      target[key] = source[key];
    }
  }
  return target;
}

function objectAssign2(target: any, ...sources: any[]): object {
  if (target === null || target === undefined) {
    throw new Error("Target cannot be null or undefined");
  }
  // Number, String and Boolean target are wrapped
  if (["number", "string", "boolean"].includes(typeof target)) {
    target = Object(target);
  }
  for (const source of sources) {
    if (source === null || source === undefined) continue;
    const keys = [
      ...Object.keys(source), // symbol keys are omitted when iterated, need to use Object.getOwnPropertySymbols
      ...Object.getOwnPropertySymbols(source).filter(
        (symbolKey) =>
          Object.getOwnPropertyDescriptor(source, symbolKey)!.enumerable
      ),
    ];
    for (const key of keys) {
      // Reflect.set sets the prop with value, returns false if the prop is not writable, returns true when successful
      if (!Reflect.set(target, key, source[key])) {
        throw new Error(`Target property "${String(key)}" is not writable`);
      }
    }
  }
  return target;
}
