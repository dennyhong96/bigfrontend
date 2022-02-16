type Node = null | {
  value: number;
  left: Node;
  right: Node;
};

function invert(node: Node): Node {
  if (!node) return null;
  const left = node.left;
  node.left = node.right;
  node.right = left;
  invert(node.left);
  invert(node.right);
  return node;
}

export {};
