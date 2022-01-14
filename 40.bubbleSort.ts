// O(n^2) time; O(1) space;
function bubbleSort(arr: number[]): void {
  while (true) {
    let finished = true;

    // loop through numbers array, compare current value with the next one and swap position
    for (let i = 0; i < arr.length - 1; i++) {
      const currNum = arr[i];
      const nextNum = arr[i + 1];
      if (nextNum < currNum) {
        arr[i] = nextNum;
        arr[i + 1] = currNum;
        finished = false;
      }
    }

    // keep doing the loops until there's nothing to swap
    if (finished) return;
  }
}

export {};
