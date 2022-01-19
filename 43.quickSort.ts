// O(nlogn) time(avg.); O(logn) space(call stack);
// O(n^2) time when the pivot is the smallest/largest in the list(not dividing the list in halves)
function quickSort(
  arr: number[],
  startIndex = 0,
  endIndex = arr.length - 1
): void {
  if (!arr.length || endIndex <= startIndex) return;
  let currIndex = startIndex;
  let pivotIndex = endIndex; // randomly select last num as pivot

  // while loop breaks off when currIndex === pivotIndex
  // at this point pivot is garrantied to be at the correct position
  while (currIndex < pivotIndex) {
    const pivotNum = arr[pivotIndex];
    const currNum = arr[currIndex];
    if (currNum > pivotNum) {
      const numBeforePivot = arr[pivotIndex - 1];
      arr[currIndex] = numBeforePivot; // put numBeforePivot into currIndex
      arr[pivotIndex - 1] = pivotNum; // move pivotNum one index to the left
      arr[pivotIndex] = currNum; // move currNum to the right of pivotNum
      pivotIndex--; // decrement pivotIndex to its new index
      // cannot increment currIndex here, need to compare the new item on this index with the pivot
    } else {
      currIndex++; // compare the next item with pivot
    }
  }
  quickSort(arr, startIndex, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, endIndex);
}

// Example
const arr = [3, 7, 8, 5, 2, 1, 9, 5, 4];
quickSort(arr);
console.log(arr);

export { quickSort };
