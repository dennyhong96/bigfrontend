interface IMatchedResult {
  combinedKeyword: string;
  highlighted: string;
}

function highlightKeywords(html: string, keywords: string[]): string {
  return html
    .split(" ")
    .map((word) => {
      const allMatches = findKeywordCombinationsMatchWord(word, keywords);
      const highlightedHTML = getHighlightedHTMLFromMatches(allMatches);
      return highlightedHTML ?? word;
    })
    .join(" ");
}

// Sliding window algorithm - find and return all possible keyword matches for the given word
// Take following cases into account:
// - A single keyword matches the word - "Hello", ["Hello", "World"]
// - Multiple keywords combined matche the word - "JavaScript", ["Java", "Script", "Rocks"]
// - Word matched multiple times by keywords that overlaps - "JavaScript", ["Java", "JavaScript", "Go"]
function findKeywordCombinationsMatchWord(
  word: string,
  keywords: string[]
): IMatchedResult[] {
  let l = 0;
  let r = 0;
  let runningCombinedKeyword = "";
  const results: IMatchedResult[] = [];
  while (l <= r && r < keywords.length) {
    const keyword = keywords[r];
    runningCombinedKeyword += keyword;
    if (word.includes(runningCombinedKeyword)) {
      results.push({
        combinedKeyword: runningCombinedKeyword,
        highlighted: wordToHighlightedHTML(word, runningCombinedKeyword),
      });
      r++;
    } else if (runningCombinedKeyword.length <= word.length) {
      r++;
    } else if (runningCombinedKeyword.length > word.length) {
      const lKeyword = keywords[l];
      runningCombinedKeyword = runningCombinedKeyword.replace(lKeyword, "");
      l++;
      // Need to remove rKeyword from runningCombinedKeyword too since it will
      // be added back in during the next iteration
      const rKeyword = keywords[r];
      runningCombinedKeyword = runningCombinedKeyword.replace(rKeyword, "");
    }
  }
  return results;
}

// Find and return the one highlighted HTML from all possible keyword matches based on requirements
function getHighlightedHTMLFromMatches(
  allMatches: IMatchedResult[]
): string | null {
  let result: null | string = null;
  let keyword: null | string = null;
  for (const { combinedKeyword, highlighted } of allMatches) {
    // Use the longer keyword that matches the word when there are multiple matches
    if (!keyword || combinedKeyword.length > keyword.length) {
      keyword = combinedKeyword;
      result = highlighted;
    }
  }
  return result;
}

const wordToHighlightedHTML = (word: string, keyword: string): string => {
  const parts = word.split(keyword);
  if (parts[0] === "" && parts[1] === "") {
    // exact match
    return `<em>${word}</em>`;
  } else if (parts[0] === "" && parts[1] !== "") {
    // matched from the start to somewhere before the end
    return `<em>${keyword}</em>${parts[1]}`;
  } else {
    // matched from somewhere after the start to the end
    return `${parts[0]}<em>${keyword}</em>`;
  }
};

// Example
console.log(
  highlightKeywords("Hello FrontEnd Lovers", ["Hello", "Front", "JavaScript"])
); // <em>Hello</em> <em>Front</em>End Lovers

// Edge case #1: if keywords can be matched combined, match the combination
console.log(
  highlightKeywords("Hello FrontEnd Lovers", ["Front", "End", "JavaScript"])
); // Hello <em>FrontEnd</em> Lovers

// Edge case #2: if keywords have overlap, match the longer keyword
console.log(
  highlightKeywords("Hello FrontEnd Lovers", [
    "Front",
    "FrontEnd",
    "JavaScript",
  ])
); // Hello <em>FrontEnd</em> Lovers

export {};
