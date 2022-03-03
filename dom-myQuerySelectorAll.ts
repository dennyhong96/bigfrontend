// https://medium.com/@emailid.akshay/lets-implement-queryselectorall-in-javascript-2d47ce8fe5b3
export function myQuerySelectorAll(
  root: HTMLElement | null,
  selector: string,
  result: HTMLElement[] = []
): HTMLElement[] {
  if (!root) return [];

  if (root.matches(selector)) result.push(root);
  for (const child of root.children) {
    myQuerySelectorAll(child as HTMLElement, selector, result);
  }
  return result;
}
