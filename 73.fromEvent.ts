import { Observable } from "./57.Observable";

export function fromEvent(
  element: Element,
  eventName: string,
  capture = false
) {
  const observerable = new Observable<Event>((observer) => {
    element.addEventListener(
      eventName,
      function (e) {
        observer.next(e);
      },
      { capture }
    );
  });
  return observerable;
}

// Example
const button = document.createElement("button");
const source = fromEvent(button, "click");
source.subscribe((e) => console.log(e));
button.click();
button.click();
button.click();
