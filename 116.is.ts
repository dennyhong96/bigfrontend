export function is(a: any, b: any) {
  if (typeof a === "number" && typeof b === "number") {
    if (a === 0 && b === 0) return 1 / a === 1 / b; // 1/0 = Infinity, 1/-0 = -Infinity
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
  }
  return a === b;
}
