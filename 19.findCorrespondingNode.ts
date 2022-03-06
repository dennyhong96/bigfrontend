// O(n) time; O(h) space; h is height of DOM tree - Recursive DFS
export const findCorrespondingNode = (
  rootA: HTMLElement,
  rootB: HTMLElement,
  target: HTMLElement
): HTMLElement | null => {
  if (rootA === target) return rootB;
  for (let i = 0; i < rootA.children.length; i++) {
    const childA = rootA.children[i] as HTMLElement;
    const childB = rootB.children[i] as HTMLElement;
    const foundB = findCorrespondingNode(childA, childB, target);
    if (foundB) return foundB;
  }
  return null;
};

// O(n) time; O(n) space; - Iterative DFS preorder
const findCorrespondingNode1 = (
  rootA: HTMLElement,
  rootB: HTMLElement,
  target: HTMLElement
): HTMLElement | null => {
  const stack = [{ rootA, rootB }];
  while (stack.length) {
    const { rootA, rootB } = stack.pop()!;
    if (rootA === target) return rootB;
    for (let i = rootA.children.length - 1; i >= 0; i--) {
      const childA = rootA.children[i] as HTMLElement;
      const childB = rootB.children[i] as HTMLElement;
      stack.push({ rootA: childA, rootB: childB });
    }
  }
  return null;
};

// O(h) time; O(h) space;
// Use HTMLElement's special attribute - parentElement
const findCorrespondingNode2 = (
  rootA: HTMLElement,
  rootB: HTMLElement,
  target: HTMLElement
): HTMLElement | null => {
  if (rootA === target) return rootB;

  // get index paths from target to rootA
  const paths: number[] = [];
  while (target !== rootA) {
    const parent = target.parentElement;
    if (!parent) break;
    const pathIndex = Array.prototype.indexOf.call(parent.children, target);
    paths.push(pathIndex);
    target = parent;
  }

  // follow the paths in reverse on rootB
  return paths.reduceRight(
    (node, pathIndex) => node.children[pathIndex] as HTMLElement,
    rootB
  ); // reduceRight is similar to reduce, only starts off the last index
};

// Use the DOM TreeWalker API, not compatible with IE
// O(n) time; O(h) space;
const findCorrespondingNode3 = (
  rootA: HTMLElement,
  rootB: HTMLElement,
  target: HTMLElement
): HTMLElement | null => {
  if (rootA === target) return rootB;

  const treeWalkerA = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT);
  const treeWalkerB = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT);

  while (treeWalkerA.currentNode !== target) {
    treeWalkerA.nextNode();
    treeWalkerB.nextNode();
  }

  return treeWalkerB.currentNode as HTMLElement;
};
