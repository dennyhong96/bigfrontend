export function getTextBetweenTwoNodes(node1, node2) {
  const result = [];

  const findNode = (node) => {
    if (!node) return false; // base case1: exhausted all path of node, didn't find node2,
    if (node === node2) return true; // base case2: found node2, return true, do not include text in node2
    if (node.nodeType === 3) {
      const text = node.textContent?.trim();
      if (text) result.push(text);
    } // base case3: node is a text node, append text to res
    if (node.childNodes) {
      for (const child of node.childNodes) {
        const found = findNode(child);
        if (found) return true;
      }
    } // handle node with child nodes
    return false;
  };

  let currNode = node1;
  while (currNode && !findNode(currNode)) {
    currNode = currNode.nextSibling ?? currNode.parentNode?.nextSibling;
  }

  return result;
}

console.log(getTextBetweenTwoNodes(node1, node2));
