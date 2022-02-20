// O(n) time; O(n) space;
export function validate(str: string) {
  const closeToOpenMap: Record<string, string> = {
    "}": "{",
    "]": "[",
    ")": "(",
  };

  const stack = [];

  for (const char of str) {
    if (!closeToOpenMap[char]) {
      stack.push(char);
    } else {
      const lastOpen = stack.pop();
      if (closeToOpenMap[char] !== lastOpen) return false;
    }
  }

  return stack.length === 0;
}
