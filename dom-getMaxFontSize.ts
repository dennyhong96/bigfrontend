export function getMaxFontSize(text: string, container: HTMLElement): number {
  const tmp = document.createElement("span");
  tmp.textContent = text;
  tmp.style.fontSize = `1px`;

  // make tmp not disrupt document flow
  tmp.style.visibility = "hidden";
  tmp.style.position = "absolute";

  document.body.append(tmp); // must append to get size and position
  const textWidth = tmp.getBoundingClientRect().width;
  tmp.remove(); // remove tmp to free memory

  const containerWidth = container.getBoundingClientRect().width;
  return containerWidth / textWidth;
}
