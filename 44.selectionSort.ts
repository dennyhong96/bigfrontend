// O(n^2) time; O(1) space
function selectionSort(arr: number[]): void {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; i < arr.length; j++) {
      const num = arr[j];
      if (num < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const tmp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = tmp;
    }
  }
}

const arr = [5, 4, 3, 2, 1];
selectionSort(arr);
console.log(arr);

export {};
