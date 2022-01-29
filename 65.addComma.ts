function addComma(num: number): string {
  const parts = String(num).split(".");
  const [whole, decimals] = parts;
  const wholeArr = [...whole];
  let runningDigitCount = 0;
  for (let i = wholeArr.length - 1; i >= 0; i--) {
    // i > 0 since we don't want to add "," in front of the first digit/ negetive sign
    if (i > 0) {
      runningDigitCount++; // don't count "," as a digit
      if (runningDigitCount === 3) {
        wholeArr.splice(i, 0, ",");
        runningDigitCount = 0;
      }
    }
  }
  return `${wholeArr.join("")}${decimals ? `.${decimals}` : ""}`;
}

function addComma1(num: number): string {
  const parts = String(num).split(".");
  const [whole, decimals] = parts;
  // Positive lookahead regex, if the positive lookahead group (?=(\d{3})+$) is true, return the match (\d)
  // (?=(\d{3})+$) puts 3 numbers in a group, repeat 1 or more times, and the last number must be the end
  const commaAdded = whole.replace(/(\d)(?=(\d{3})+$)/g, (match) => {
    console.log(match);
    return `${match},`;
  });
  return commaAdded + (decimals ? `.${decimals}` : "");
}

// Example:
console.log(addComma(1));
console.log(addComma(1000));
console.log(addComma(-12345678));
console.log(addComma(12345678.12345));
