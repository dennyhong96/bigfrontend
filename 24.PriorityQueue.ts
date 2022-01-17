type CompareFn<T> = (a: T, b: T) => number;

// This is a min binary heap data structure
class PriorityQueue<T> {
  private data: T[]; // O(n) space;
  private compare: CompareFn<T>;

  constructor(compare: CompareFn<T>) {
    this.data = [];
    this.compare = compare;
  }

  // O(1) time; O(1) space;
  public size(): number {
    return this.data.length;
  }

  // O(1) time; O(1) space;
  public peek(): T | undefined {
    return this.data[0];
  }

  // O(n) time; O(1) space;
  public add(element: T): void {
    // push elemnet to the list
    this.data.push(element);
    // bubble up the element to its correct position
    this.bubbleUp();
  }

  // O(n) time; O(1) space;
  // move the tail element up to its correct position
  private bubbleUp(): void {
    let elementIndex = this.data.length - 1;
    const element = this.data[elementIndex];
    // while elementIndex > 0 since we know when elementIndex === 0
    // the element is already the smallest, nothing left to compare with
    while (elementIndex > 0) {
      const parentIndex = Math.floor((elementIndex - 1) / 2);
      const parent = this.data[parentIndex];
      if (this.compare(element, parent) >= 0) {
        return; // if element is larger than the parent, it's already at the correct position
      }
      this.data[elementIndex] = parent;
      this.data[parentIndex] = element;
      elementIndex = parentIndex;
    }
  }

  // O(n) time; O(1) space;
  public poll(): T | undefined {
    // shift element out of the list
    const head = this.data.shift();
    if (this.data.length) {
      // move the last element to be the head
      this.data.unshift(this.data.pop()!);
      // sink head back down to its correct position
      this.sinkDown();
    }

    return head;
  }

  // O(n) time; O(1) space;
  // move the head element down to its correct position
  private sinkDown() {
    let elementIndex = 0;
    const element = this.data[elementIndex];
    while (true) {
      let swapIndex: null | number = null;
      const leftChildIndex = elementIndex * 2 + 1;
      if (leftChildIndex < this.data.length) {
        const leftChild = this.data[leftChildIndex];
        // if element is larger than leftChild, it's not at the correct position
        if (this.compare(element, leftChild) > 0) {
          swapIndex = leftChildIndex;
        }
      }
      const rightChildIndex = elementIndex * 2 + 2;
      if (rightChildIndex < this.data.length) {
        const rightChild = this.data[rightChildIndex];
        // if element is larger than rightChild, it's not at the correct position
        if (
          this.compare(element, rightChild) > 0 &&
          (swapIndex === null ||
            this.compare(rightChild, this.data[swapIndex]) < 0) // swap with the smaller child between the two
        ) {
          swapIndex = rightChildIndex;
        }
      }
      if (!swapIndex) {
        return; // element is smaller than both children, it's already at the correct position
      } else {
        const smallerChild = this.data[swapIndex];
        this.data[swapIndex] = element;
        this.data[elementIndex] = smallerChild;
        elementIndex = swapIndex;
      }
    }
  }
}

const pq = new PriorityQueue<number>((a, b) => a - b);
// (a, b) => a - b means
// smaller numbers are closer to index:0
// which means smaller number are to be removed sooner

pq.add(5); // now 5 is the only element
pq.add(2); // 2 added
pq.add(1); // 1 added
console.log(pq);
console.log(pq.peek()); // since smaller number are sooner to be removed, so this gives us 1
console.log(pq.poll()); // 1 is removed, 2 and 5 are left
console.log(pq.peek()); // 2 is the smallest now, this returns 2
console.log(pq.poll()); // 2 is removed, only 5 is left
console.log(pq);

export {};
