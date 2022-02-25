type MyNode = MyElement | string;
type MyElement = {
  type: string;
  props: {
    [key: string]: string | MyNode | MyNode[];
    children: MyNode | MyNode[];
  };
};

export function virtualize(element: HTMLElement): MyElement {
  const obj: MyElement = {
    type: "",
    props: {
      children: [],
    },
  };

  // Handle type
  obj.type = element.tagName.toLowerCase();

  // Handle props
  for (const { name, value } of element.attributes) {
    const key = name === "class" ? "className" : name;
    obj.props[key] = value;
  }

  // Handle children
  const children: MyNode[] = [];
  for (const childNode of element.childNodes) {
    if (childNode.nodeName === "#text") {
      children.push(childNode.textContent!);
    } else {
      children.push(virtualize(childNode as HTMLElement));
    }
  }
  obj.props.children = children.length === 1 ? children[0] : children;

  return obj;
}

export function render(obj: MyElement) {
  const element = document.createElement(obj.type);

  // Handle attributes
  let { children, ...attributes } = obj.props;
  for (const [name, value] of Object.entries(attributes)) {
    const key = name === "className" ? "class" : name;
    element.setAttribute(key, value as string);
  }

  // Handle children
  if (!Array.isArray(children)) children = [children];
  element.append(
    ...children.map((child) => {
      if (typeof child === "string") return document.createTextNode(child);
      return render(child);
    })
  );

  return element;
}
