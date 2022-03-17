class Queue {
  private data: any[];
  constructor() {
    this.data = [];
  }
  public enqueue(element: any) {
    this.data.push(element);
  }
  public peek() {
    return this.data[0];
  }
  public dequeue() {
    return this.data.shift();
  }
  public size() {
    return this.data.length;
  }
}

export class Stack {
  private queue1: Queue;
  private queue2: Queue;

  constructor() {
    this.queue1 = new Queue(); // always maintain queue1 has the correct order(last item in at 0 index)
    this.queue2 = new Queue();
  }

  push(element: any) {
    this.queue2.enqueue(element);
    while (this.queue1.size()) {
      this.queue2.enqueue(this.queue1.dequeue());
    }
    while (this.queue2.size()) {
      this.queue1.enqueue(this.queue2.dequeue());
    }
  }

  peek() {
    return this.queue1.peek();
  }

  pop() {
    return this.queue1.dequeue();
  }

  size() {
    return this.queue1.size();
  }
}
// S
// Q1:[]
// Q2:[]
