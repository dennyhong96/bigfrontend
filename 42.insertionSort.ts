// O(n^2) time; O(1) space;
function insertionSort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    const currNum = arr[i];
    for (let j = i - 1; j >= 0; j--) {
      const prevNum = arr[j];
      if (currNum < prevNum) {
        arr[j] = currNum;
        arr[j + 1] = prevNum;
      }
    }
  }
}

// Example
const arr = [3, 2, 1]; // -> [2,3,1] -> [2,1,3] -> [1,2,3]
insertionSort(arr);
console.log(arr);

export {};
