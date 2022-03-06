type MyNode = MyElement | string;
interface MyElement {
  type: string;
  props: {
    [key: string]: string | MyNode[];
    children: MyNode[];
  };
}

export function createElement(
  type: string,
  props: Record<string, string>,
  ...children: MyNode[]
): MyElement {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

export function render(myElement: MyElement): HTMLElement {
  const element = document.createElement(myElement.type);

  // handle attributes
  let { children, ...restProps } = myElement.props;
  for (const [name, value] of Object.entries(restProps)) {
    const key = name === "className" ? "class" : name;
    element.setAttribute(key, value as string);
  }

  // handle children
  if (!Array.isArray(children)) children = [children];
  element.append(
    ...children.map((child) => {
      if (typeof child === "string") return document.createTextNode(child);
      return render(child);
    })
  );

  return element;
}

// Example:
const h = createElement;
const myElement = h(
  "div",
  {},
  h("h1", {}, " this is "),
  h(
    "p",
    { className: "paragraph" },
    " a ",
    h("button", {}, " button "),
    " from ",
    h("a", { href: "https://bfe.dev" }, h("b", {}, "BFE"), ".dev")
  )
);
const element = render(myElement);
console.log(element); // HTMLDivElement
