// O(n) time; O(h) space; Recursive solution search from target up to root
export function nextRightSibling(
  root: HTMLElement,
  target: HTMLElement
): HTMLElement | null {
  // If target has a nextElementSibling, just return that
  if (target.nextElementSibling) {
    return target.nextElementSibling as HTMLElement;
  }

  // Target does not have a nextElementSibling under the same parent
  // we need to find the right sibling of the parent recursively
  let parent = target.parentElement;

  // If the parent right sibling has a firstElementChild, that is the result
  // otherwise, keep finding one that has a firstElementChild recursively
  while (parent && parent !== root /* we can't go furthur up than root */) {
    parent = nextRightSibling(root, parent);
    if (parent?.firstElementChild)
      return parent.firstElementChild as HTMLElement;
  }

  return null;
}

// O(n) time; O(n) space; Iterative BFS level order traversal
function nextRightSibling1(root: HTMLElement, target: HTMLElement) {
  const queue = [root];
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      if (node === target) return queue[0] ?? null;
      for (const child of node.children) {
        queue.push(child as HTMLElement);
      }
    }
  }
  return null;
}

// Example
const tree = document.createElement("div");
tree.innerHTML = `
<div class="">
  <p>
    <a href=""></a>
  </p>
  <p>
    <button></button>
  </p>
</div>
<div class="">
  <p></p>
</div>
<div class="">
  <p>
    <a href="" id="lucky"></a>
    <a href=""></a>
  </p>
</div>
`;
const a: HTMLElement = tree.querySelector("#lucky")!;
console.log(nextRightSibling(tree, a)); // <a/>

export {};
