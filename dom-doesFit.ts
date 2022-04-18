export function doesFit(
  text: string,
  fontSize: number,
  container: HTMLElement
): boolean {
  const tmp = document.createElement("span");
  tmp.textContent = text;
  tmp.style.fontSize = `${fontSize}px`; // must add unit

  // make tmp not disrupt document flow
  tmp.style.position = "absolute";
  tmp.style.visibility = "hidden";

  document.body.append(tmp);
  const textRect = tmp.getBoundingClientRect();
  tmp.remove(); // remove tmp to free memory

  const textWidth = textRect.width;
  const textHeight = textRect.height;

  const containerRect = container.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  return textWidth <= containerWidth && textHeight <= containerHeight;
}
