// Sliding window - O(n) time; O(1) space;
export function compress(str: string) {
  if (!str || str.length < 2) return str;
  let result = str[0];
  let repeatCount = 1;
  let i = 0;
  let j = 1;
  while (j < str.length) {
    const char1 = str[i];
    const char2 = str[j];
    if (char2 === char1) {
      repeatCount++;
    } else {
      if (repeatCount > 1) result += repeatCount;
      result += char2;
      repeatCount = 1;
      i = j;
    }
    j++;
  }
  if (repeatCount > 1) result += repeatCount;
  return result;
}

// Example
console.log(compress("a")); // a
console.log(compress("abc")); // abc
console.log(compress("aabbc")); // a2b2c
console.log(compress("aaabbcc")); // a3b2c2
