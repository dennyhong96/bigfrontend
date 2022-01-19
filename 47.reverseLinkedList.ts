class Node {
  val: number;
  next: Node | null;
  constructor(val: number, next?: Node) {
    this.val = val;
    this.next = next ?? null;
  }
}

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

const reverseLinkedList1 = (currNode?: Node): Node | undefined => {
  if (!currNode || !currNode.next) return currNode;
  const newHead = reverseLinkedList1(currNode.next);
  currNode.next.next = currNode;
  currNode.next = null;
  return newHead;
};

// 4,3,1

export {};
