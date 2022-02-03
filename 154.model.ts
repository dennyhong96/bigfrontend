function model(state: { value: string }, element: HTMLInputElement) {
  Object.defineProperty(element, "value", {
    get() {
      return state.value;
    },
    set(newVal) {
      state.value = newVal;
    },
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

export {};
