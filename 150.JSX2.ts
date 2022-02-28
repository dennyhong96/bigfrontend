type AST = {
  openingElement: {
    name: string;
  };
  closingElement: {
    name: string;
  };
  children: (string | AST)[];
};

type MyElement = {
  type: string;
  props: {
    [key: string]: string | MyNode | MyNode[];
    children: MyNode | MyNode[];
  };
};

type MyNode = MyElement | string;

function parse(code: string): AST {
  // 1. extract open tag
  let openTag = "";
  let i = 0;
  for (; i < code.length; i++) {
    if (code[i] === " ") continue;
    openTag = openTag + code[i];
    if (code[i] === ">") break;
  }

  // 2. extract close tag
  let closeTag = "";
  let j = code.length - 1;
  for (; j >= 0; j--) {
    if (code[j] === " ") continue;
    closeTag = code[j] + closeTag;
    if (code[j] === "<") break;
  }

  // handle throw for <a>></a> or <a><</a> per requirement
  handleSpecificError(code, i, j);

  // 3. validate tags match
  if (!matches(openTag, closeTag)) {
    throw new Error(`don't match`);
  }

  // 4. extract children
  const childMarkup = code.slice(i + 1, j);
  const children = getChildrenFromHTML(childMarkup).map((child) => {
    // child is a html string, need to parse it recursively
    if (child.match(/^<.*>$/)) {
      return parse(child);
    }
    // child is a text string, return directly
    return child;
  });

  return {
    openingElement: {
      name: extractTagName(openTag),
    },
    closingElement: {
      name: extractTagName(closeTag),
    },
    children,
  };
}

function generate(ast: AST): MyElement {
  let type = ast.openingElement.name;

  // handle functional component
  if (ast.openingElement.name !== ast.openingElement.name.toLowerCase()) {
    type = eval(ast.openingElement.name); // gets the Functional Component definition from upper scope
  }

  return {
    type,
    props: {
      children: ast.children.map((child) => {
        if (typeof child === "string") {
          // handle string child
          return child;
        }
        // handle ast child recursively
        return generate(child);
      }),
    },
  };
}

/* --------------------------------------------------------------------------- */
/* --------------------------------- Helpers --------------------------------- */
/* --------------------------------------------------------------------------- */
function extractTagName(tag: string): string {
  return tag.replace(/[^a-zA-Z0-9]/gi, "");
}

// returns whether open tag matches close tag
function matches(openTag: string, closeTag: string): boolean {
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
  throw new Error("Specific error per requirement");
}

// returns whether the cursor is pointing at the start of an open tag
function isOpenTag(html: string, cursor: number): boolean {
  return Boolean(html[cursor] === "<" && html[cursor + 1].match(/[a-zA-Z0-9]/));
}

// returns whether the cursor is point at the start of an close tag
function isCloseTag(html: string, cursor: number): boolean {
  return Boolean(
    html[cursor] === "<" &&
      html[cursor + 1] === "/" &&
      html[cursor + 2].match(/[a-zA-Z0-9]/)
  );
}

// returns the full tag(open or close) that starts at a given index, along with the ending index
function getFullTag(
  html: string,
  startIndex: number
): {
  tag: string;
  endIndex: number;
} {
  let tag = "";
  while (startIndex < html.length) {
    const char = html[startIndex];
    tag += char;
    if (char === ">") return { tag, endIndex: startIndex };
    startIndex++;
  }
  return {
    tag: "",
    endIndex: startIndex,
  };
}

// receives an html string, seperated it into an array of children text strings and html strings
// this function only goes one level deep -
// "ab<div>ab<p>c</p></div>cd<span>123</span>" -> [ "ab", "<div>ab<p>c</p></div>", "cd", "<span>123</span>" ]
function getChildrenFromHTML(html: string): string[] {
  const children = []; // html string | text string
  let cursor = 0;
  let isTagStarted = false;
  let openTagName = "";
  let repeatedOpenTagCount = 0; // handle situations like <div>ab<div>c</div>de</div>, in this case repeatedOpenTagCount = 1
  let runningTag = "";
  let runningText = "";
  while (cursor < html.length) {
    // handle runningTag closes
    if (
      isTagStarted &&
      isCloseTag(html, cursor) &&
      extractTagName(getFullTag(html, cursor).tag) === openTagName
    ) {
      if (repeatedOpenTagCount === 0) {
        // handle last string child
        if (runningText.length) {
          children.push(runningText);
          runningText = "";
        }
        isTagStarted = false;
        openTagName = "";
        const { tag, endIndex } = getFullTag(html, cursor);
        runningTag += tag;
        children.push(runningTag);
        runningTag = "";
        cursor = endIndex + 1;
      } else {
        repeatedOpenTagCount--;
        runningTag += html[cursor];
        cursor++;
      }
      continue;
    }

    // handle runningTag opens
    if (isOpenTag(html, cursor)) {
      const { tag, endIndex } = getFullTag(html, cursor);
      if (!isTagStarted) {
        // handle last string child
        if (runningText.length) {
          children.push(runningText);
          runningText = "";
        }
        openTagName = extractTagName(tag); // set openTagName
        isTagStarted = true;
        runningTag += tag;
        cursor = endIndex + 1;
      } else {
        const tagName = extractTagName(tag);
        if (tagName === openTagName) repeatedOpenTagCount++;
        runningTag += html[cursor];
        cursor++;
      }
      continue;
    }

    // handle adding char to runningTag
    if (isTagStarted) {
      runningTag += html[cursor];
    } else {
      // handle adding char to runningText
      runningText += html[cursor];
    }
    cursor++;
  }
  if (runningText.length) children.push(runningText); // handle trailing last string child
  return children;
}
/* --------------------------------------------------------------------------- */
/* ------------------------------- End Helpers ------------------------------- */
/* --------------------------------------------------------------------------- */

export {};
