export class Stack {
  private data: any[];
  constructor() {
    this.data = [];
  }
  public push(element: any) {
    this.data.push(element);
  }
  public peek() {
    return this.data[this.data.length - 1];
  }
  public pop() {
    return this.data.pop();
  }
  public size() {
    return this.data.length;
  }
}

export class Queue {
  stack1: Stack;
  stack2: Stack;

  constructor() {
    this.stack1 = new Stack();
    this.stack2 = new Stack(); // always maintain stack2 has the correct order (first item in at last index)
  }

  enqueue(element: any) {
    while (this.stack2.size() > 0) {
      this.stack1.push(this.stack2.pop());
    }
    this.stack1.push(element);
    while (this.stack1.size() > 0) {
      this.stack2.push(this.stack1.pop());
    }
  }

  peek() {
    return this.stack2.peek();
  }

  size() {
    return this.stack2.size();
  }

  dequeue() {
    return this.stack2.pop();
  }
}
// Q
// S1: []
// S2: []
