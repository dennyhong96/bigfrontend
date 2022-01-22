class Node {
  val: number;
  next: Node | null;
  constructor(val: number, next?: Node) {
    this.val = val;
    this.next = next ?? null;
  }
}

// Iterative - O(n) time; O(1) space;
const reverseLinkedList = (list: Node): Node => {
  let head = list;
  let curr = head;
  while (curr && curr.next) {
    const tmp = curr.next;
    curr.next = curr.next.next;
    tmp.next = head;
    head = tmp;
  }
  return head;
};

// Recursive - O(n) time; O(n) space;
const reverseLinkedList1 = (head: Node | null): Node | null => {
  if (!head || !head.next) return head;
  const newHead = reverseLinkedList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};

// 4,3,1

export {};
