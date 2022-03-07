// The key is to use Object.prototype.toString.call
function detectType(data: any): string {
  const mySet = new Set([
    "number",
    "string",
    "boolean",
    "array",
    "object",
    "null",
    "map",
    "set",
    "date",
    "function",
    "arraybuffer",
  ]);
  const type =
    Object.prototype.toString
      .call(data)
      .match(/\[object (.+)\]/)?.[1]
      .toLowerCase() ?? null;
  if (!type || !mySet.has(type)) return typeof data; // fallback to typeof
  return type;
}
