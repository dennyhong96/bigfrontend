// MyElement is a "serialized" format representing a DOM element
type MyElement = {
  type: string;
  props: {
    [key: string]: string | MyNode | MyNode[];
    children: MyNode | MyNode[];
  };
};

type MyNode = MyElement | string;

export function virtualize(element: HTMLElement): MyElement {
  // Handle type
  const myElement: MyElement = {
    type: element.tagName.toLowerCase(),
    props: {
      children: [],
    },
  };

  // Handle props
  for (const { name, value } of element.attributes) {
    const propKey = name === "class" ? "className" : name;
    myElement.props[propKey] = value;
  }

  // Handle children
  const children: MyNode[] = [];
  for (const childNode of element.childNodes) {
    if (childNode.nodeName === "#text") {
      // childNode is a textNode, push the string content into children
      children.push(childNode.textContent!);
    } else {
      // childNode is a HTMLElement, recursively call virtualize to get the MyElement
      children.push(virtualize(childNode as HTMLElement));
    }
  }
  myElement.props.children = children.length === 1 ? children[0] : children;

  return myElement;
}

// Takes a 'serialized' recursive object representing a DOM structure (MyElement)
// 'deserialize' and returns the actual DOM Element
export function render(myElement: MyElement): HTMLElement {
  const element = document.createElement(myElement.type);

  // handle element attributes
  let { children, ...restProps } = myElement.props;
  for (const [name, value] of Object.entries(restProps)) {
    const attrKey = name === "className" ? "class" : name;
    element.setAttribute(attrKey, value as string);
  }

  // handle children
  if (!Array.isArray(children)) children = [children];
  element.append(
    ...children.map((child) => {
      // child is some string, return a textNode
      if (typeof child === "string") {
        return document.createTextNode(child);
      }
      // child is of type MyElement, need to recursively call render
      return render(child);
    })
  );

  return element;
}
