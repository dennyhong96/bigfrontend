// Trie solution
class TrieNode {
  public children = new Map<string, TrieNode>();
  // public end = false; // We don't need this field for this problem
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  public addWord(word: string): void {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      let node = curr.children.get(char);
      if (!node) {
        node = new TrieNode();
        curr.children.set(char, node);
      }
      curr = node;
    }
    // curr.end = true;
  }

  public highlight(html: string): string {
    let curr = this.root;
    let runningSubstrMatch = "";
    let highlighted = "";
    for (let i = 0; i < html.length; i++) {
      const char = html[i];
      if (curr.children.has(char)) {
        // Handles overlap keywords case
        // Because we keep looking for matches in children until it's the end of the trie branch
        runningSubstrMatch += char;
        curr = curr.children.get(char)!;
      } else if (this.root.children.has(char)) {
        // Handles adjacent match
        // Because we keep looking for matches all over again from Trie root but keep adding matches if found to runningSubstrMatch
        runningSubstrMatch += char;
        curr = this.root.children.get(char)!;
      } else {
        highlighted +=
          (runningSubstrMatch.length ? `<em>${runningSubstrMatch}</em>` : "") +
          char;
        runningSubstrMatch = "";
        curr = this.root;
      }
    }
    if (runningSubstrMatch.length) {
      highlighted += `<em>${runningSubstrMatch}</em>`;
      runningSubstrMatch = "";
    }
    return highlighted;
  }
}

function highlightKeywords(html: string, keywords: string[]): string {
  const trie = new Trie();
  keywords.forEach((keyword) => trie.addWord(keyword));
  return trie.highlight(html);
}

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

// Regex solution
function highlightKeywords1(html: string, keywords: string[]) {
  // Move longer keyword closer to index 0, this handles overlapping case
  keywords.sort((a, b) => b.length - a.length);
  // This handles overlapping because when we call html.replace() later,
  // If a substring of html is matched successfully one time,
  // that substring will not be used for matching anymore
  // #1 - 'Hello FrontEnd Lovers'.replace(/JavaScript|Frontend|Front/ig, (regex, {match}) => {
  //          console.log(match)
  //      })  ---> callback invoked one time with match being 'Frontend'
  // #2- 'Hello FrontEnd Lovers'.replace(/JavaScript|Front|FrontEnd/ig, (regex, {match}) => {
  //          console.log(match)
  //      })  ---> callback invoked one time with match being 'Front'
  // #3 - 'Hello FrontEnd Lovers'.replace(/JavaScript|Front|End/ig, (regex, {match}) => {
  //          console.log(match)
  //      })  ---> callback invoked two time with match being 'Front', and then 'End'

  // When regex has the g flag, string.replace(regex, callback) callback is invoked one time for each match
  let regex = new RegExp(keywords.join("|"), "gi");
  return html
    .replace(regex, (match) => `<em>${match}</em>`)
    .replace(/<\/em><em>/g, ""); // Hanldes adjacent matching cases, because
  // 'Hello FrontEnd Lovers'.replace(/JavaScript|Front|End/ig, (regex, {match}) => {
  //    console.log(match) ---> callback is invoked two time with match being 'Front', and then 'End'
  // }) ---> 'Hello <em>Front</em><em>End</em> Lovers', still need to remove the '</em><em>' part
}

(function () {
  // Sliding window solution
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
})();

export {};
