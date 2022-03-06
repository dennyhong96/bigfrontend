class Node {
  value: number;
  left: null | Node;
  right: null | Node;
  constructor(val: number) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

// O(n) time; O(n) space;
export function serialize(root: Node | null): string {
  const values: string[] = [];
  // preorder DFS
  const dfs = (root: Node | null) => {
    if (!root) {
      values.push("null");
      return;
    }
    values.push(`${root.value}`);
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return values.join(",");
}

// O(n) time; O(n) space;
export function deserialize(str: string): Node | null {
  const values = str.split(",");
  let cursor = 0;
  // preorder DFS
  const dfs = (): Node | null => {
    if (values[cursor] === "null") {
      cursor++;
      return null;
    }
    const root = new Node(Number(values[cursor]));
    cursor++;
    root.left = dfs();
    root.right = dfs();
    return root;
  };
  return dfs();
}
