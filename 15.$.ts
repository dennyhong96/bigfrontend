function $(el: HTMLElement) {
  // el is stored in closure
  return {
    css(prop: string, value: string) {
      // @ts-ignore
      el.style[prop] = value;
      return this; // this is the object being returned, so we can keep chaining the css method
    },
  };
}
