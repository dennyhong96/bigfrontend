/**
 * @param {HTMLElement}
 * @return {object} object literal presentation
 */
function virtualize(element) {
  if (element.nodeName === "#text") return element.textContent;

  const obj = {
    props: {},
  };

  // Handle type
  obj.type = element.tagName.toLowerCase();

  // Handle props
  for (const attr of element.attributes) {
    const key = attr.name === "class" ? "className" : attr.name;
    obj.props[key] = attr.value;
  }

  // Handle children
  let children = [];
  for (const childNode of element.childNodes) {
    if (childNode.nodeName === "#text") {
      children.push(childNode.textContent);
    } else {
      children.push(virtualize(childNode));
    }
  }
  obj.props.children = children.length === 1 ? children[0] : children;

  return obj;
}

/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement}
 */
function render(obj) {
  // Handle text node
  if (typeof obj === "string") {
    return document.createTextNode(obj);
  }

  const element = document.createElement(obj.type);

  // Handle attributes
  let { children, ...attributes } = obj.props;
  for (const [name, value] of Object.entries(attributes)) {
    const key = name === "className" ? "class" : name;
    element.setAttribute(key, value);
  }

  // Handle children
  if (!Array.isArray(children)) children = [children];
  element.append(...children.map((child) => render(child)));

  return element;
}
