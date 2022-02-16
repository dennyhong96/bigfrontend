export function wrap(arr: any[] & { [key in string | symbol | number]: any }) {
  return new Proxy(arr, {
    get(target, prop: string | symbol | number) {
      if (prop === Symbol.iterator) {
        return target[prop].bind(target);
      }
      if (Number.isFinite(Number(prop))) {
        if (Number(prop) < 0) {
          prop = Number(prop) + target.length;
        } else {
          prop = Number(prop);
        }
      }
      return target[prop];
    },
    set(target, prop: string | symbol | number, value) {
      if (Number.isFinite(Number(prop))) {
        if (Number(prop) < 0) {
          prop = Number(prop) + target.length;
        } else {
          prop = Number(prop);
        }
        if (prop < 0) throw new Error();
      }
      target[prop] = value;
      return true;
    },
  });
}
