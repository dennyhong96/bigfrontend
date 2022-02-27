/**
 * @param {code} string
 * @returns {any} AST
 */
function match(open, close) {
  if (close.length - open.length !== 1) {
    return false;
  }
  for (let i = close.length - 1; i > -1; i--) {
    if (close[i] >= "a" && close[i] <= "b") {
      if (i > 0 && open[i - 1] !== close[i]) {
        return false;
      }
    } else {
      if (close[i] === "/") {
        if (i === 1 && open[i - 1] === "<") {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}

function extractTag(s) {
  return s.replace(/([^0-9a-z])/gi, "");
}

function parse(code) {
  let openTag = "";
  for (var i = 0; i < code.length; i++) {
    if (code[i] !== " ") {
      openTag += code[i];
      if (code[i] === ">" && i < code.length - 1 && code[i + 1] !== ">") {
        break;
      }
    }
  }
  // extract close tag
  let closeTag = "";
  for (var j = code.length - 1; j > 0; j--) {
    if (code[j] !== " ") {
      closeTag = code[j] + closeTag;
      if (code[j] === "<" && j > 0 && code[j - 1] !== "<") {
        break;
      }
    }
  }
  // children == [i:j]
  const child = code.slice(i + 1, j);
  // check if open and close tag match
  if (!match(openTag, closeTag)) {
    throw new Error();
  }
  const tagName = extractTag(openTag);

  return {
    openingElement: {
      name: tagName,
    },
    closingElement: {
      name: tagName,
    },
    children: child ? [child] : [],
  };
}

/**
 * @param {any} your AST
 * @returns {string}
 */
function generate(ast) {
  return {
    type: ast.openingElement.name,
    props: {
      children: ast.children,
    },
  };
}

parse("<a>bfe.dev</a>");
