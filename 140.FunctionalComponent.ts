// MyElement is a "serialized" format representing a DOM element
interface MyElement {
  type: string;
  props: {
    [key: string]: string | MyNode[];
    children: MyNode[];
  };
}

type MyNode = MyElement | string;

// FunctionalComponent is a function that receives props and children,
// when invoked, calls createElement and returns the result MyElement
type FunctionalComponent = (props: {
  [key: string]: string | MyNode[];
  children: MyNode[];
}) => MyElement;

// Creates 'serialized' object representing a DOM structure (MyElement)
export function createElement(
  type: string | FunctionalComponent,
  props: Record<string, string>,
  ...children: MyNode[]
): MyElement {
  // if the type parameter receives a function instead of a string typeName
  // we invoke the functional component, and forward the props and children as arguments
  // when invoking the functinoal component, a createElement call will happen
  // what's returned from the functional component invokation is result of the createElement call
  // so in the end, a the return type is still a MyElement
  if (typeof type === "function") {
    return type({ ...props, children }); // this is a 'implicit' recursive call
  }
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

// Takes a 'serialized' recursive object representing a DOM structure (MyElement)
// 'deserialize' and returns the actual DOM Element
export function render(myElement: MyElement) {
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
