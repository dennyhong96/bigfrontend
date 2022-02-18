class Node {
  val: any;
  next: Node;
  constructor(val: any, next: Node) {
    this.val = val;
    this.next = next;
  }
}

// fast & slow pointers O(n) time; O(1) space;
export function hasCircle(head: Node) {
  if (!head) return false;
  let slow: Node = head;
  let fast: Node | null = head;
  while (slow.next && fast!.next.next) {
    if (fast === slow) return true;
    slow = slow.next;
    fast = fast.next.next;
  }
  return false;
}
