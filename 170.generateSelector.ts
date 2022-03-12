// Start from target, traverse upwards and collect every element's selector untill it reaches root
// O(h) time; O(h) space;
export function generateSelector(root: Element, target: Element): string {
  // what happen if no selector is found? just return empty ''

  let selectors: string[] = [];

  let currElement: Element | null = target;
  while (currElement) {
    if (currElement === root) break;
    const selector = getElementSelector(currElement);
    selectors.unshift(selector);
    currElement = currElement.parentElement;
  }

  return selectors.join(" > ");
}

// Use recursive DFS to collect selectors of every element on the path from root to target
// O(n) time; O(h) space;
export function generateSelector1(root: Element, target: Element): string {
  // what happen if no selector is found? just return empty ''

  const selectors: string[] = [];

  const collectSelectors = (root: Element): boolean => {
    if (root === target) return true; // returns whether we found the target on this path
    for (const child of root.children) {
      const found = collectSelectors(child);
      if (found) {
        const selector = getElementSelector(child);
        selectors.unshift(selector); // unshift because we are inserting element selectors closer to target first
        return true;
      }
    }
    return false;
  };
  collectSelectors(root);

  return selectors.join(" > "); // join selectors with the child combinator
}

function getElementSelector(element: Element): string {
  const tag = element.tagName.toLowerCase();
  // try to se id selector
  if (element.id) return `${tag}#${element.id}`;
  // try to use nth-child selector
  if (element.parentElement) {
    const index = Array.prototype.findIndex.call(
      element.parentElement.children,
      (c) => c === element
    );
    return `${tag}:nth-child(${index + 1})`; // :nth-child is 1 based index
  } else {
    // fallback to class selector
    const classes = Array.prototype.join.call(element.classList, ".");
    return `${tag}${classes.length ? `.${classes}` : ""}`;
  }
}

// Example
const root = document.createElement("div");
root.innerHTML = `<p id="p1">BFE.dev</p>
  <div>
    is
    <p class="abc def ghi">
      <span>great. <button>click me!</button></span>
    </p>
  </div>`;
const target = root.querySelector("button")!;
let selector = generateSelector(root, target);
console.log(selector); // div:nth-child(2) > p:nth-child(1) > span:nth-child(1) > button:nth-child(1)
console.log(root.querySelector(selector)); // HTMLButtonElement
