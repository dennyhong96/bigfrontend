// O(nlogn) time; O(1) space;
export function findTwo(arr: number[], target = 0) {
  arr.sort((a, b) => a - b); // O(logn) time;
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    const lNum = arr[l];
    const rNum = arr[r];
    const sum = lNum + rNum;
    if (sum === target) return [l, r];
    if (sum < target) {
      l++;
    } else {
      // sum > target
      r--;
    }
  }
  return null;
}

// O(n) time; O(n) space;
export function findTwo1(arr: number[], target = 0) {
  const map = new Map(); // diff, index
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    const diff = target - num;
    if (map.has(diff)) {
      return [i, map.get(diff)];
    } else {
      map.set(num, i);
    }
  }
  return null;
}
