// O(logn*m) time; O(n) space;
export function merge(
  arrList: number[][],
  start = 0,
  end = arrList.length - 1
): number[] {
  if (end - start < 0 || !arrList.length) return [];
  if (end - start === 0 || arrList.length === 1) return arrList[start];
  if (end - start === 1) return mergeTwoLists(arrList[start], arrList[end]);
  const mid = start + Math.floor((end - start) / 2);
  const leftMerged = merge(arrList, start, mid);
  const rightMerged = merge(arrList, mid + 1, end);
  return mergeTwoLists(leftMerged, rightMerged);
} // O(logn) time;

// O(m) m is avg size of sorted arrays
function mergeTwoLists(list1: number[], list2: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;
  while (i < list1.length || j < list2.length) {
    const num1 = list1[i];
    const num2 = list2[j];
    if (num1 < num2 || num2 === undefined) {
      result.push(num1);
      i++;
    } else {
      result.push(num2);
      j++;
    }
  }
  return result;
}

/*
merge(
  [
    [1,1,1,100,1000,10000],
    [1,2,2,2,200,200,1000],
    [1000000,10000001],
    [2,3,3]
  ]
)
// [1,1,1,1,2,2,2,2,3,3,100,200,200,1000,1000,10000,1000000,10000001]
*/
