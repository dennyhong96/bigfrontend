/**
 * @param {number[]} arr - ascending array with duplicates
 * @param {number} target
 * @return {number}
 */
function lastIndex(arr: number[], target: number) {
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    const m = l + Math.floor((r - l) / 2);
    const num = arr[m];
    if (num === target) {
      let i = m + 1;
      while (arr[i] === num && i < arr.length) {
        i++;
      }
      return i - 1;
    }
    if (num < target) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  return -1;
}

export {};
