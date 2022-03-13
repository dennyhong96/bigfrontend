/*
  Event delegation refers to the process of using event propagation (bubbling) to handle events
  at a higher level in the DOM tree than the element on which the event is triggered. It allows to
  attach a single event listener for elements that exist both now or *in the future*. This is important
  because in some situations we dynamically append child elements that we would otherwise have no way
  to attach event listeners directly
 */

type PredicateFn = (el: Element) => boolean;
type EventHandlerFn = (e: Event) => void;

// We need this map because we only want to attach one real event listener for the same root
const eventStore = new Map<Element, [PredicateFn, EventHandlerFn][]>(); // Map<root, [predicate, handler][]>

export function onClick(
  root: Element,
  predicate: PredicateFn,
  handler: EventHandlerFn
) {
  if (eventStore.has(root)) {
    eventStore.get(root)!.push([predicate, handler]);
    return;
  }
  eventStore.set(root, [[predicate, handler]]);

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
    let element = evt.target as Element | null;
    while (element) {
      // The order of handlers being attached to root is the order the handlers
      // are being called
      for (const [predicate, handler] of eventStore.get(root)!) {
        if (predicate(element)) {
          handler.call(element, evt);
          if (isImmediatePropagationStopped) break;
          // If several listeners are attached to the same element for the same event type, they are called in the order in which they were added.
          // If stopImmediatePropagation() is invoked during one such call, we don't want other handlers called on this target with 'click' event
        }
      }
      if (element === root || isPropagationStopped) break;
      element = element.parentElement;
    }
  });
}
