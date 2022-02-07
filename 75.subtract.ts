function subtract(num1: string, num2: string): string {
  const num1Chars = num1.split("");
  const num2Chars = num2.split("");

  let carryOver = 0;
  let result = "";

  while (num1Chars.length || num2Chars.length || carryOver !== 0) {
    const dig1 = Number(num1Chars.pop() ?? 0);
    const dig2 = Number(num2Chars.pop() ?? 0);
    let sub = dig1 - dig2 + carryOver;
    carryOver = sub < 0 ? -1 : 0; // if (dig1 < dig2) we don't have enough to substract, need to borrow from next digit so carryOver = -1
    result = `${(sub + 10) % 10}${result}`; // sub: -9 -> (-9 + 10) % 10 = 1
  }

  // Get rid of leading "0"s
  while (result.length > 1 && Number(result[0]) === 0) {
    result = result.slice(1);
  }

  return result;
}

// Example
console.log(subtract("999", "88")); // "991"
console.log(subtract("100", "99")); // "1"

export {};
