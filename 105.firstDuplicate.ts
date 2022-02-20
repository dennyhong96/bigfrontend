// O(n) time; O(n) space;
export function firstDuplicate(str: string): string | null {
  const charSet = new Set();
  for (const char of str) {
    if (charSet.has(char)) return char;
    charSet.add(char);
  }
  return null;
}
