// O(n) time; O(1) space;
function largestDiff(arr: number[]): number {
  if (!arr.length) return 0;
  let min = Infinity;
  let max = -Infinity;
  let result = 0;
  for (const num of arr) {
    if (num < min) {
      min = num;
      result = Math.abs(max - min);
    }
    if (num > max) {
      max = num;
      result = Math.abs(max - min);
    }
  }
  return result;
}

// O(nlogn) time; O(1) space;
export function largestDiff1(arr: number[]): number {
  if (arr.length <= 1) return 0;
  arr.sort((a, b) => a - b);
  return Math.abs(arr[0] - arr[arr.length - 1]);
}

// Example
// largestDiff([-1, 2,3,10, 9])
