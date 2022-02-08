import { add as addAbs } from "./62.add";
import { subtract as subtractAbs } from "./75.subtract";

export function subtract(num1: string, num2: string): string {
  const isNum1Negetive = num1[0] === "-";
  const isNum2Negetive = num2[0] === "-";

  // Remove sign
  num1 = num1.replace(/^[-|+]/, "");
  num2 = num2.replace(/^[-|+]/, "");

  // default case, use subtractAbs directly
  if (!isNum1Negetive && !isNum2Negetive) {
    return subtractAbs(num1, num2);
  } else if (isNum1Negetive && isNum2Negetive) {
    // subtrackAbs -3 -5 -> -2, we need 2
    // subtrackAbs -5 -3 -> 2, we need -2
    const sub = subtractAbs(num1, num2);
    return sub[0] === "-" ? sub.slice(1) : sub === "0" ? sub : `-${sub}`;
  } else if (isNum1Negetive && !isNum2Negetive) {
    // addAbs -5 3 -> 8, we need -8
    // addAbs -3 5 -> 8, we need -8
    return `-${addAbs(num1, num2)}`;
  } else {
    // addAbs 5 -3 -> 8, we need 8
    // addAbs 3 -5 -> 8, we need 8
    return addAbs(num1, num2);
  }
}

// Example
console.log(subtract("-9", "-9"));
console.log(subtract("33", "55"));
console.log(subtract("55", "3"));
console.log(subtract("-22", "-33"));
console.log(subtract("-55", "33"));
console.log(subtract("-33", "55"));
console.log(subtract("55", "-33"));
console.log(subtract("33", "-55"));
