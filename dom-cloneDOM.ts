// O(n) time; O(h) space;
export function cloneDOM(dom: Element | null): Element | null {
  if (!dom) return null;

  // Handle type
  const element = document.createElement(dom.tagName.toLowerCase());

  // Handle attributes
  for (const { name, value } of dom.attributes) {
    element.setAttribute(name, value);
  }

  // Handle childNodes (text node, comment node, element node)
  const childNodes = Array.prototype.map.call(
    dom.childNodes,
    (childNode: ChildNode): Node | string => {
      if (childNode.nodeName === "#text") {
        return document.createTextNode(childNode.textContent ?? "");
      } else if (childNode.nodeName === "#comment") {
        return document.createComment(childNode.textContent ?? "");
      } else {
        return cloneDOM(childNode as Element)!;
      }
    }
  ) as (Node | string)[];
  element.append(...childNodes);

  return element;
}
