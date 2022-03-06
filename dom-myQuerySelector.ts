// https://medium.com/@emailid.akshay/lets-implement-queryselectorall-in-javascript-2d47ce8fe5b3
export function myQuerySelector(
  root: HTMLElement | null,
  selector: string
): HTMLElement | null {
  if (!root || !selector) return null;

  // all modern browsers provides Element.prototype.matches()
  if (root.matches(selector)) return root;
  for (const child of root.children) {
    const found = myQuerySelector(child as HTMLElement, selector);
    if (found) return found;
  }
  return null;
}
