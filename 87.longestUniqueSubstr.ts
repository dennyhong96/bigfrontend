// O(n) time; O(n) space;
export function longestUniqueSubstr(str: string) {
  const mySet = new Set();
  let i = 0;
  let j = 0;
  let longestRange: number[] = [];
  while (j < str.length) {
    const char = str[j];

    while (mySet.has(char)) {
      const lChar = str[i];
      mySet.delete(lChar);
      i++;
    }

    mySet.add(char);
    if (
      !longestRange.length ||
      longestRange[1] - longestRange[0] + 1 < j - i + 1
    ) {
      longestRange = [i, j];
    }
    j++;
  }

  let result = "";
  for (let i = longestRange[0]; i <= longestRange[1]; i++) {
    result += str[i];
  }

  return result;
}

// Example:
console.log(longestUniqueSubstr("aaaaa"));
// 'a'
console.log(longestUniqueSubstr("abcabc"));
// 'abc', or 'bca', or 'cab'
console.log(longestUniqueSubstr("a12#2"));
// 'a12#'
