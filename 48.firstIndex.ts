/**
 * @param {number[]} arr - ascending array with duplicates
 * @param {number} target
 * @return {number}
 */
function firstIndex(arr: number[], target: number): number {
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    const m = l + Math.floor((r - l) / 2);
    const num = arr[m];
    if (num === target) {
      // Keep moving i pointer left to find the first element with the same value
      let i = m - 1;
      while (arr[i] === arr[m] && i + 1 >= 0) {
        i--;
      }
      return i + 1;
    }
    if (num < target) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  return -1;
}

console.log(firstIndex([1, 1, 2, 3, 3, 3, 4, 4, 4, 5], 4)); // 4 -> 6
