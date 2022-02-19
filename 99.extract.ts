export function extract(str: string): string[] {
  return str.match(/<a(\s[^>]*)?>.*?<\s*\/\s*a>/gim) ?? [];
}
// [^>] means match any single char that is NOT >
// ? means match previous token 0 or 1 time
// .*? means match any character 0 to unlimited times, as least times as possible (lazy)

// Example:
console.log(
  extract(`
<div>
    <a>link1< / a><a href="https://bfe.dev">link1< / a>
    <div<abbr>bfe</abbr>div>
    <div>
<abbr>bfe</abbr><a href="https://bfe.dev" class="link2"> <abbr>bfe</abbr>   <span class="l">l</span><span  class="i">i</span>   nk2   </a>
    </div>
</div>
`)
);
