export function add(num1: string, num2: string) {
  const num1Arr = num1.split("");
  const num2Arr = num2.split("");
  let result = "";
  let carryOver = 0;
  while (num1Arr.length || num2Arr.length || carryOver > 0) {
    const d1 = Number(num1Arr.pop() ?? 0);
    const d2 = Number(num2Arr.pop() ?? 0);
    const sum = d1 + d2 + carryOver;
    const currDigit = sum % 10;
    carryOver = Math.floor(sum / 10);
    result = `${currDigit}${result}`;
  }
  return result;
}

// Example
console.log(add("999999999999999999", "1"));
