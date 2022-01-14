// arr is ascending unique array
function binarySearch(arr: number[], target: number): number {
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    const m = l + Math.floor((r - l) / 2);
    const mValue = arr[m];
    if (target === mValue) return m;
    if (target < mValue) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  return -1;
}

// 1,2,3,4,5
