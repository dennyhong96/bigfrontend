// Recursive pre-order DFS
function getTags(tree: Element, tags = new Set<string>()): string[] {
  tags.add(tree.tagName.toLowerCase());
  for (const child of tree.children) {
    getTags(child, tags);
  }
  return Array.from(tags);
}

// Iterative pre-order DFS
function getTags1(tree: Element) {
  const tags = new Set<string>();
  const stack: Element[] = [tree];
  while (stack.length) {
    const node = stack.pop()!;
    tags.add(node.tagName.toLowerCase());
    for (let i = node.children.length - 1; i >= 0; i--) {
      const child = node.children[i];
      stack.push(child);
    }
  }
  return Array.from(tags);
}
