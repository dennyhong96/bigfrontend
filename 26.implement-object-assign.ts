function objectAssign(target: any, ...sources: any[]): object {
  if (target === null || typeof target === "undefined") {
    throw new Error("Target cannot be null or undefined");
  }
  // Number, String and Boolean target are wrapped
  if (typeof target === "number") {
    target = new Number(target);
  } else if (typeof target === "string") {
    target = new String(target);
  } else if (typeof target === "boolean") {
    target = new Boolean(target);
  }
  for (const source of sources) {
    if (
      (typeof source !== "object" &&
        typeof source !== "string" &&
        typeof source !== "number" &&
        typeof source !== "function") ||
      source === null // null is of type "object"
    ) {
      continue;
    }
    if (typeof source === "string") {
      for (let i = 0; i < source.length; i++) {
        const char = source[i];
        target[i] = char;
      } // Object.assign({}, "abc") -> {0:"a",1:"b",2:"c"}
    } else {
      const keys = [
        ...Object.keys(source), // symbol keys are omitted when iterated
        ...Object.getOwnPropertySymbols(source),
      ];
      for (const key of keys) {
        // check if a prop is writable
        const propDescriptor = Object.getOwnPropertyDescriptor(target, key); // returns an object describing the configuration of a specific property on a given object
        if (propDescriptor && !propDescriptor.writable) {
          throw new Error(`Target key "${String(key)}" is not writable`);
        }
        target[key] = source[key];
      }
    }
  }
  return target;
}
