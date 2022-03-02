// html`<div>Hello, ${"Denny"}</div>`
// parts: ["<div>Hello, ", "}</div>"], substitudes: ["Denny"]
export function html(parts: string[], ...substitudes: string[]) {
  let htmlString = "";
  let subIndex = 0;
  for (const part of parts) {
    htmlString += part;
    htmlString += substitudes[subIndex] ?? "";
    subIndex++;
  }
  return htmlString;
}

// render the result from html() into the container
export function render(htmlString: string, container: HTMLElement) {
  container.innerHTML = htmlString;
}
