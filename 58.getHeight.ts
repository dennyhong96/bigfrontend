// Recursive - O(n) time; O(logn) space(callstack);
function getHeight(tree: Element): number {
  if (!tree) return 0;
  if (!tree.children.length) return 1;
  return 1 + Math.max(...[...tree.children].map((child) => getHeight(child)));
}

// Iterative BFS - O(n) time; O(n) space;
function getHeight1(tree: Element): number {
  const queue: Element[] = [];
  queue.push(tree);
  let height = 0;
  while (queue.length) {
    height++;
    const levelElementsCount = queue.length;
    for (let i = 0; i < levelElementsCount; i++) {
      const element = queue.shift()!;
      [...element.children].forEach((child) => queue.push(child));
    }
  }
  return height;
}

// Example
const div = document.createElement("div");
div.innerHTML = `
<div>
  <p>
    <button>Hello</button>
  </p>
</div>
<p>
  <span>World!</span>
</p>`;

console.log(getHeight(div));

export {};
