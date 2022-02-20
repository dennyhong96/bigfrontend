export function flatten(root: HTMLElement | null): HTMLElement[] {
  const result: HTMLElement[] = []; // HTMLElement[]
  if (!root) return result;

  const queue = [root]; // HTMLElement[]
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      result.push(node);
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        queue.push(child as HTMLElement);
      }
    }
  }

  return result;
}
