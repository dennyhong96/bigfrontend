function cloneDeep<T extends { [key in any]: any }>(
  data: T,
  dataToClonedMap = new Map()
): T {
  if (
    typeof data !== "object" ||
    // null is of type object
    data === null ||
    // Handle primitive types wrapper Object
    [
      "[object Number]",
      "[object String]",
      "[object Boolean]",
      "[object Symbol]",
      "[object BigInt]",
      "[object Undefined]",
    ].includes(Object.prototype.toString.call(data))
  ) {
    return data;
  }

  // Handle circular reference infinite loop
  if (dataToClonedMap.has(data)) {
    return dataToClonedMap.get(data);
  }

  if (Array.isArray(data)) {
    const result: any = [];
    dataToClonedMap.set(data, result);
    for (let i = 0; i < data.length; i++) {
      const val = data[i];
      result[i] = cloneDeep(val, dataToClonedMap);
    }
    return result;
  } else {
    const result: any = {};
    dataToClonedMap.set(data, result);
    const keys = [...Object.keys(data), ...Object.getOwnPropertySymbols(data)];
    // const keys = Reflect.ownKeys(data) // Reflect.ownKeys(obj) includes symbol keys too
    for (const key of keys) {
      const val = data[key as string | symbol];
      result[key] = cloneDeep(val, dataToClonedMap);
    }
    return result;
  }
}

// Example:
const obj: {
  a: {
    b: {
      c?: {};
    };
  };
} = { a: { b: {} } };
obj.a.b.c = obj.a;

const cloned = cloneDeep(obj);
console.log(cloned);

export {};
