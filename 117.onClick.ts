/*
  Event delegation refers to the process of using event propagation (bubbling) to handle events
  at a higher level in the DOM tree than the element on which the event is triggered. It allows to
  attach a single event listener for elements that exist both now or *in the future*. This is important
  because in some situations we dynamically append child elements that we would otherwise have no way
  to attach event listeners directly
 */

type PredicateFn = (el: HTMLElement) => boolean;
type EventHandlerFn = (e: Event) => void;

// We need this map because we only want to attach one real event listener for the same root
const rootToHandlersMap = new Map<
  HTMLElement,
  [PredicateFn, EventHandlerFn][]
>(); // Map<root, [predicate, handler][]>

export function onClick(
  root: HTMLElement,
  predicate: PredicateFn,
  handler: EventHandlerFn
) {
  if (rootToHandlersMap.has(root)) {
    rootToHandlersMap.get(root)!.push([predicate, handler]);
    return;
  }
  rootToHandlersMap.set(root, [[predicate, handler]]);

  // Only attach one real event listener to the same root element
  root.addEventListener("click", function (evt) {
    // We cannot use the native stopPropagation and stopImmediatePropagation
    // because when we are doing event delegation we always want to propagate events to root
    // We need to implement our own stopPropagation and stopImmediatePropagation behavior
    let isPropagationStopped = false;
    let isImmediatePropagationStopped = false;
    evt.stopPropagation = () => {
      isPropagationStopped = true;
    };
    evt.stopImmediatePropagation = () => {
      isImmediatePropagationStopped = true;
      evt.stopPropagation(); // stopImmediatePropagation also stops the propagation
    };

    // traverse from event target to root
    // try every element in between with the predicates, invoke hanlders when matching
    let element = evt.target as HTMLElement | null;
    while (element) {
      // The order of handlers being attached to root is the order the handlers
      // are being called
      for (const [predicate, handler] of rootToHandlersMap.get(root)!) {
        if (predicate(element as HTMLElement)) {
          handler.call(element, evt);
          if (isImmediatePropagationStopped) break;
        }
      }
      if (element === root || isPropagationStopped) break;
      element = element.parentElement;
    }
  });
}
