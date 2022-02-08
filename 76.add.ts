import { add as addAbs } from "./62.add";
import { subtract as subtractAbs } from "./75.subtract";

function addWithSign(num1: string, num2: string): string {
  const isNum1Negetive = num1[0] === "-";
  const isNum2Negetive = num2[0] === "-";

  // Remove sign
  num1 = num1.replace(/^[+|-]/, "");
  num2 = num2.replace(/^[+|-]/, "");

  // handle case 1
  if (isNum1Negetive === isNum2Negetive) {
    return `${isNum1Negetive ? "-" : ""}${addAbs(num1, num2)}`;
  } else {
    const res = subtractAbs(num1, num2);
    if (isNum1Negetive && res[0] === "-") {
      return res.slice(1);
    } // handle case 2.1.1
    return `${isNum1Negetive ? "-" : ""}${res}`; // handle case 2.1.2, 2.2.1, 2.2.2
  }
}

//case 1: Both same sign, we just add numbers
//        1.1: +,+
//        1.2: -,- mark result -

// case 2: Diff signs, we subtract
//      2.1 : (-,+)
//          2.1.1    (n1 < n2) : subtractAbs result will be - , Ex: (-8)+(9) = + (remove '-' sign from final res)
//          2.1.2    (n1 > n2) : subtractAbs result will be + , Ex: (-9)+(8) = - (add '-' sign to final res)
//      2.2 : (+,-)
//          2.2.1    (n1 < n2) : subtractAbs result will be - , Ex: (8)+(-9) = - (keep subtractAbs result as it is)
//          2.2.2    (n1 > n2) : result will be - , Ex: (9)+(-8) = + (keep subtractAbs result as it is)
