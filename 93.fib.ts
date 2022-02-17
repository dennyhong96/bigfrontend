export function fib(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (!fib.cache.has(n)) {
    const result = fib(n - 1) + fib(n - 2);
    fib.cache.set(n, result);
  }
  return fib.cache.get(n)!;
}
fib.cache = new Map<number, number>();
