const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

let id = 0;
export function getUniqueClassName(): string {
  let className = "";
  let num = id;
  while (num >= 0) {
    className = `${chars[num % chars.length]}${className}`;
    num = Math.floor(num / chars.length) - 1;
  }
  id++;
  return className;
}

getUniqueClassName.reset = function (): void {
  id = 0;
};
