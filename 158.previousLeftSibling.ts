// O(n) time; O(h) space; Recursive solution search from target up to root
export function previousLeftSibling(
  root: Element,
  target: Element
): Element | null {
  // If target has a previousElementSibling, just return that
  if (target.previousElementSibling) return target.previousElementSibling;

  // Target does not have a left sibling under the same parent
  // we need to find the left sibling of the parent recursively
  let parent: Element | null = target.parentElement;

  // If the parent left sibling has a lastElementChild, that is the result
  // otherwise, keep finding one that has a lastElementChild recursively
  while (parent) {
    if (parent === root) break; // we can't go furthur up than root
    parent = previousLeftSibling(root, parent);
    if (parent?.lastElementChild) return parent.lastElementChild;
  }

  return null;
}

// O(n) time; O(n) space; Iterative BFS level order traversal
function previousLeftSibling1(root: Element, target: Element): Element | null {
  const queue: Element[] = [root];
  while (queue.length) {
    const len = queue.length;
    // Use a variable to track previous sibliing
    let prevSibling: Element | null = null;
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      if (node === target) return prevSibling;
      prevSibling = node;
      for (const child of node.children) {
        queue.push(child);
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
    <button id="button"></button>
  </p>
</div>
<div class="">
  <p></p>
</div>
<div class="">
  <p>
    <a href="" ></a>
    <a href=""></a>
  </p>
</div>
`;
const node: Element = tree.querySelector("#button")!;
console.log(previousLeftSibling(tree, node)); // <a/>
