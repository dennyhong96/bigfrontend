export function classNames(...args: any): string {
  args = flatten(args); // Get rid of nested arrays

  const parts: string[] = [];

  args.forEach((arg: any) => {
    // Handle string and number
    if (typeof arg === "string" || typeof arg === "number") {
      parts.push(`${arg}`);
    }

    // Handle object
    if (typeof arg === "object" && arg !== null) {
      for (const key of Object.keys(arg)) {
        if (!arg[key]) continue;
        parts.push(key);
      }
    }
  });

  return parts.join(" ");
}

function flatten(arr: any[], result: any = []) {
  for (const el of arr) {
    if (Array.isArray(el)) {
      flatten(el, result);
    } else {
      result.push(el);
    }
  }
  return result;
}

// Example
console.log(classNames("BFE", "dev", 100)); // 'BFE dev is cool'
console.log(classNames(["BFE", [{ dev: true }, ["is", [obj]]]])); // 'BFE dev is cool'
