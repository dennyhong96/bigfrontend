type AST = {
  openingElement: {
    name: string;
  };
  closingElement: {
    name: string;
  };
  children: string[];
};

type MyElement = {
  type: string;
  props: {
    [key: string]: string | MyNode | MyNode[];
    children: MyNode | MyNode[];
  };
};

type MyNode = MyElement | string;

// Parse JSX code string into AST
function parse(code: string): AST {
  // 1. extract open tag
  let openTag = ""; // <a>
  let i = 0;
  for (; i < code.length; i++) {
    if (code[i] === " ") continue;
    openTag = openTag + code[i];
    if (code[i] === ">") break;
  }

  // 2 .extract close tag
  let closeTag = ""; // </a>
  let j = code.length - 1;
  for (; j > 0; j--) {
    if (code[j] === " ") continue;
    closeTag = code[j] + closeTag;
    if (code[j] === "<") break;
  }

  // handle throw for <div>></div> or <div><</div> per requirement
  handleSpecificError(code, i, j);

  // 3. check if open and close tags match
  if (!match(openTag, closeTag)) {
    throw new Error(`Open tag ${openTag} doesn't match close tag ${closeTag}`);
  }

  // 4. extract children == [i:j]
  const childMarkup = code.slice(i + 1, j);

  return {
    openingElement: {
      name: extractTagName(openTag),
    },
    closingElement: {
      name: extractTagName(closeTag),
    },
    children: childMarkup.length ? [childMarkup] : [],
  };
}

function extractTagName(tag: string): string {
  return tag.replace(/([^0-9a-z])/gi, "");
}

function match(openTag: string, closeTag: string): boolean {
  return (
    !openTag.includes("/") &&
    closeTag.length - openTag.length === 1 &&
    extractTagName(openTag) === extractTagName(closeTag)
  );
}

// handle throw for <a>></a> or <a><</a> per requirement
function handleSpecificError(
  code: string,
  openTagEnd: number,
  closeTagStart: number
): void {
  if (code[openTagEnd + 1] !== ">" && code[closeTagStart - 1] !== "<") return;
  throw new Error();
}

// Taks an AST and transform into MyElement object that represents a DOM structure
function generate(ast: AST): MyElement {
  return {
    type: ast.openingElement.name,
    props: {
      children: ast.children,
    },
  };
}

export {};
