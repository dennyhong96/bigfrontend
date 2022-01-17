import { PriorityQueue } from "./24.PriorityQueue";

// O(n^2 + k) time; O(n) space;
function findKThLargest(arr: number[], k: number) {
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
