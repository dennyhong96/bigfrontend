// https://medium.com/@emailid.akshay/lets-implement-queryselectorall-in-javascript-2d47ce8fe5b3
export function myQuerySelectorAll(
  root: Element | null,
  selector: string,
  result: Element[] = []
): Element[] {
  if (!root || !selector) return [];

  if (root.matches(selector)) result.push(root);
  for (const child of root.children) {
    myQuerySelectorAll(child, selector, result);
  }
  return result;
}
