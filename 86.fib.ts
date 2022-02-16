export function fib(n: number, memo: Record<number, number> = {}) {
  if (n <= 1) return n;
  if (!memo[n]) {
    const res = fib(n - 2, memo) + fib(n - 1, memo);
    memo[n] = res;
  }
  return memo[n];
}
