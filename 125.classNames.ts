export function classNames(...args: any[]) {
  // get rid of nested arrays first
  return args
    .flat(Infinity)
    .reduce((classes, value) => {
      if (!value) return classes; // handles skipping falsy values null, undefined, 0, '', false

      // handle objects, push key into classes array if value is truthy
      if (typeof value === "object") {
        for (const [key, val] of Object.entries(value)) {
          if (val) classes.push(key);
        }
        // handle strings
      } else if (["string", "number"].includes(typeof value)) {
        classes.push(value);
      }
      return classes;
    }, [])
    .join(" ");
}

// Example
console.log(classNames("BFE", "dev", 100)); // 'BFE dev is cool'
console.log(classNames(["BFE", [{ dev: true }, ["is", [obj]]]])); // 'BFE dev is cool'
