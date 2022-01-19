import { quickSort } from "./43.quickSort";
import { PriorityQueue } from "./24.PriorityQueue";

// O(nlogn) time; O(1) space;
function findKThLargest(arr: number[], k: number) {
  quickSort(arr);
  return arr[arr.length - k];
}

// PriorityQueue - O(n^2 + k) time; O(n) space;
function findKThLargest1(arr: number[], k: number) {
  const pq = new PriorityQueue<number>((a, b) => b - a); // O(n) space;

  arr.forEach((num) => {
    pq.add(num);
  }); // O(n^2) time;

  let kth = 0;
  while (pq.size() > 0) {
    const element = pq.poll();
    kth++;
    if (kth === k) return element;
  } // O(k) time;

  return null;
}

export {};
