function generateSelector(root: HTMLElement, target: HTMLElement): string {
  return getSelectorParts(root, target)?.join(" > ") ?? "";
}

function getSelectorParts(
  element: HTMLElement,
  target: HTMLElement,
  currParts: string[] = []
): string[] | null {
  currParts.push(getSelectorForElement(element));
  if (element === target) return currParts;
  for (const child of element.children) {
    const result = getSelectorParts(child as HTMLElement, target, [
      ...currParts,
    ]);
    if (result) return result;
  }
  return null;
}

function getSelectorForElement(element: HTMLElement) {
  let selector = element.tagName.toLowerCase();

  // Use id
  if (element.id) {
    selector += `#${element.id}`;
    return selector;
  }

  // Use classnames
  if (element.classList.length) {
    for (const className of element.classList) {
      selector += `.${className}`;
    }
  }

  // Use nth-child
  const parent = element.parentElement;
  if (!parent) return selector;
  const nthChild = [...parent.children].findIndex((c) => c === element) + 1;
  selector += `:nth-child(${nthChild})`;
  return selector;
}
