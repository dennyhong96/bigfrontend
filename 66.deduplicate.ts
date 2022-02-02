// O(nlogn) time; O(1) space;
function deduplicate(arr: unknown[]): void {
  arr.sort(); // make duplicates besides each other

  let nextInsertIndex = 0;
  for (let currIndex = 1; currIndex < arr.length; currIndex++) {
    const el = arr[currIndex];
    if (arr[nextInsertIndex] !== el) {
      nextInsertIndex++;
      arr[nextInsertIndex] = el;
    }
  }
  // arr.splice(5);
  if (nextInsertIndex > 0) {
    arr.length = nextInsertIndex + 1;
  }
}
// [2,3,1,4,2,3,5]
// length 7, i0, j1
// [1,2,2,3,3,4,5] i1 j2
// [1,2,2,3,3,4,5] i1 j3
// [1,2,3,3,3,4,5] i2 j4
// [1,2,3,3,3,4,5] i2 j5
// [1,2,3,4,3,4,5] i3 j6
// [1,2,3,4,5,4,5] i4 j7
// arr.length = i+1=5: [1,2,3,4,5]

// O(n) time; O(n) space;
function deduplicate1(arr: unknown[]): void {
  const visited = new Set<unknown>();
  let nextInsertIndex = 0; // nextDuplicateIndex
  for (let currIndex = 0; currIndex < arr.length; currIndex++) {
    const el = arr[currIndex];
    if (!visited.has(el)) {
      visited.add(el);
      arr[nextInsertIndex] = arr[currIndex];
      nextInsertIndex++;
    }
  }
  arr.length = nextInsertIndex; // shrink the array
}
// length 7
// set - 2,3,1,4,6
// [2,3,1,4,2,3,5] nextInsertIndex-1 currIndex-1
// [2,3,1,4,2,3,5] nextInsertIndex-2 currIndex-2
// [2,3,1,4,2,3,5] nextInsertIndex-3 currIndex-3
// [2,3,1,4,2,3,5] nextInsertIndex-4 currIndex-4
// [2,3,1,4,2,3,5] nextInsertIndex-4 currIndex-5
// [2,3,1,4,2,3,5] nextInsertIndex-4 currIndex-6
// [2,3,1,4,5,3,5] nextInsertIndex-5 currIndex-7
// arr.length = nextInsertIndex-5: [2,3,1,4,5]

// O(n^2) time; O(n) space;
function deduplicate2(arr: unknown[]) {
  const visited = new Set<unknown>();
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (visited.has(element)) {
      for (let j = i; j < arr.length; j++) {
        arr[j] = arr[j + 1];
      }
      arr.length--;
      i--;
    } else {
      visited.add(element);
    }
  }
}

export {};
