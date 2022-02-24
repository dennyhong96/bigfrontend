export function previousLeftSibling(
  root: Element,
  target: Element
): Element | null {
  // Simple case, target has a left sibling under the same parent
  if (target.previousElementSibling) return target.previousElementSibling;

  // Target does not have a left sibling under the same parent
  // we need to find the left sibling of the parent recursively
  let parent: Element | null = target.parentElement;
  if (!parent) return null;

  let parentLeftSibling = previousLeftSibling(root, parent);
  while (parentLeftSibling) {
    // If the parent left sibling has a last element child, that is the result
    // otherwise, keep finding one that has a lastElementChild recursively
    if (parentLeftSibling.lastElementChild) {
      return parentLeftSibling.lastElementChild;
    }
    parentLeftSibling = previousLeftSibling(root, parentLeftSibling);
  }

  return null;
}
