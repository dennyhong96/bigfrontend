type FunctionalComponent = (props: {
  [key: string]: string | MyNode[];
  children: MyNode[];
}) => (
  type: string,
  props: Record<string, string>,
  ...children: MyNode[]
) => MyElement;

type MyNode = MyElement | string;

interface MyElement {
  type: string;
  props: {
    [key: string]: string | MyNode[];
    children: MyNode[];
  };
}

export function createElement(
  type: string | FunctionalComponent,
  props: Record<string, string>,
  ...children: MyNode[]
):
  | MyElement
  | ((
      type: string,
      props: Record<string, string>,
      ...children: MyNode[]
    ) => MyElement) {
  // When invoking the function component
  // createElement will be called
  if (typeof type === "function") {
    return type({ ...props, children });
  }
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

export function render(myElement: MyElement) {
  const element = document.createElement(myElement.type);

  // handle props
  let { children, ...restProps } = myElement.props;
  for (const [name, value] of Object.entries(restProps)) {
    const attrKey = name === "className" ? "class" : name;
    element.setAttribute(attrKey, value as string);
  }

  // handle children
  if (!Array.isArray(children)) children = [children];
  element.append(
    ...children.map((child) => {
      if (typeof child === "string") {
        return document.createTextNode(child);
      } else {
        return render(child);
      }
    })
  );

  return element;
}
