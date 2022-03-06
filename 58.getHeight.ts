// O(n) time; O(h) space; Recursive DFS
function getHeight(tree: HTMLElement) {
  let maxHeight = 0;
  if (!tree) return maxHeight;
  for (const child of tree.children) {
    const height = getHeight(child as HTMLElement);
    maxHeight = Math.max(maxHeight, height);
  }
  return maxHeight + 1;
}

// O(n) time; O(n) space; Iterative Level Order BFS
function getHeight1(tree: HTMLElement) {
  if (!tree) return 0;
  let treeHeight = 0;
  let queue = [tree];
  while (queue.length) {
    treeHeight++;
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      for (const child of node.children) {
        queue.push(child as HTMLElement);
      }
    }
  }
  return treeHeight;
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
