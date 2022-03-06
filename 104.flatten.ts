// O(n) time; O(n) space; BFS level order traversal
export function flatten(root: Element | null): Element[] {
  const result: Element[] = [];
  if (!root) return result;

  const queue = [root];
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      result.push(node);
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        queue.push(child);
      }
    }
  }

  return result;
}

// O(n) time; O(n) space; BFS level order traversal
function flattenZigZag(root: Element | null) {
  const result: Element[] = [];
  if (!root) return result;

  const queue = [root];
  let depth = 0;
  while (queue.length) {
    depth++;
    const len = queue.length;
    const levelNodes = [];
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      levelNodes.push(node);
      for (const child of node.children) {
        queue.push(child);
      }
    }
    if (depth % 2 === 0) {
      result.push(...levelNodes);
    } else {
      result.push(...levelNodes.reverse());
    }
  }
  return result;
}
