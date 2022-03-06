// O(n) time; O(n) space; Recursive pre-order DFS
function getTags(tree: HTMLElement, tagSet: Set<string> = new Set()) {
  if (!tree) return [];
  const tagName = tree.tagName.toLowerCase();
  tagSet.add(tagName);
  for (const child of tree.children) {
    getTags(child as HTMLElement, tagSet);
  }
  return [...tagSet]; // or Array.from(tagSet)
}

// O(n) time; O(n) space; Iterative pre-order DFS
function getTags1(tree: Element) {
  const tagSet = new Set<string>();
  const stack: Element[] = [tree];
  while (stack.length) {
    const node = stack.pop()!;
    tagSet.add(node.tagName.toLowerCase());
    for (let i = node.children.length - 1; i >= 0; i--) {
      const child = node.children[i];
      stack.push(child);
    }
  }
  return Array.from(tagSet);
}
