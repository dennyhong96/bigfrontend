/**
 * @param {number[]} arr - ascending array with duplicates
 * @param {number} target
 * @return {number}
 */
function elementAfter(arr: number[], target: number) {
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    const m = l + Math.floor((r - l) / 2);
    const mNum = arr[m];
    if (mNum === target) {
      let i = m + 1;
      while (arr[i] === mNum) {
        i++;
      }
      return arr[i];
    }
    if (mNum < target) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  return undefined;
}

export {};
