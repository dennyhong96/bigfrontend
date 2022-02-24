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

export function serialize(root: Node | null): string {
  const values: string[] = [];
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

export function deserialize(str: string): Node | null {
  const values = str.split(",");
  let index = 0;
  const dfs = (): Node | null => {
    if (values[index] === "null") {
      index++;
      return null;
    }
    const root = new Node(Number(values[index]));
    index++;
    root.left = dfs();
    root.right = dfs();
    return root;
  };
  return dfs();
}
