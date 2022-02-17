// O(n) time; O(logn) space;
function nextRightSibling(
  root: HTMLElement,
  target: HTMLElement
): HTMLElement | null {
  if (target.nextElementSibling) {
    return target.nextElementSibling as HTMLElement;
  }

  // Keep finding parent's next right sibling that has a firstElementChild
  let parent = target.parentElement;
  while (parent) {
    const parentNext = nextRightSibling(root, parent);
    if (parentNext && parentNext.firstElementChild) {
      return parentNext.firstElementChild as HTMLElement;
    }
    parent = parentNext;
  }

  return null;
}

// BFS level-order traversal - O(n) time; O(n) space;
function nextRightSibling1(root: HTMLElement, target: HTMLElement) {
  const queue = [root];

  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      if (node === target) {
        if (i + 1 < len) {
          return queue[0];
        } else {
          return null;
        }
      }
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
    <a href="" id="fuck"></a>
    <a href=""></a>
  </p>
</div>
`;
const a: HTMLElement = tree.querySelector("#fuck")!;
console.log(nextRightSibling(tree, a)); // <a/>

export {};
