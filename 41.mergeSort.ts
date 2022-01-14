// O(nlogn) time; O(n) space;
function mergeSort(arr: number[], startIndex = 0, endIndex = arr.length - 1) {
  if (!arr.length || endIndex === startIndex) return;
  const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
  mergeSort(arr, startIndex, middleIndex);
  mergeSort(arr, middleIndex + 1, endIndex);
  merge(arr, startIndex, middleIndex, endIndex);
}

// O(n^2) time; O(1) space;
function merge(
  arr: number[],
  left: number,
  middle: number,
  right: number
): void {
  let leftIndex = left;
  let rightIndex = middle + 1;
  while (leftIndex <= middle && rightIndex <= right) {
    const leftNum = arr[leftIndex];
    const rightNum = arr[rightIndex];
    if (leftNum < rightNum) {
      // leftNum is at the correct position
      leftIndex++;
    } else {
      // insert rightNum before leftNum, all elements in between should be shifted one to the right
      for (let i = rightIndex - 1; i >= leftIndex; i--) {
        arr[i + 1] = arr[i];
      }
      arr[leftIndex] = rightNum;

      // increment all pointers
      rightIndex++;
      middle++;
      leftIndex++;
    }
  }
}

// [5,4,3,2,1]
// 5,4,3 2,1
// 5,4 3 2 1
// 3,4,5; 1,2 -> 1,3,4,5; 2 -> 1,2,3,4,5
// l   m  r        l   m  r      l   m  r

// [1,2,3,4,5]
// 1,2,3; 4,5 -> 1,2,3; 4,5 -> 1,2,3; 4,5

// Example
const arr = [5, 4, 3, 2, 1];
mergeSort(arr);
console.log(arr);

export {};
