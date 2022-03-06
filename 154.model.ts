export function model(state: { value: string }, element: HTMLInputElement) {
  element.value = state.value; // set initial value on input

  // define object getter and setter
  Object.defineProperty(state, "value", {
    get() {
      return element.value; // the value on element is the single source of truth
    },
    set(newValue) {
      element.value = newValue;
    },
  });

  // invoke setter on change input event
  element.addEventListener("change", (evt) => {
    state.value = (evt.target as HTMLInputElement).value;
  });
}

// Example
const input = document.createElement("input");
const state = { value: "BFE" };
model(state, input);
console.log(input.value); // 'BFE
state.value = "dev";
console.log(input.value); // 'dev'
input.value = "BFE.dev";
input.dispatchEvent(new Event("change"));
console.log(state.value); // 'BFE.dev'
