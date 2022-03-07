class BrowserHistory {
  private entries: (string | undefined)[];
  private cursor: number;

  // The idea is leave the fist index empty when BrowserHistory is initialized without an initial url
  constructor(url?: string) {
    this.entries = [];
    this.cursor = 0;
    if (url) this.entries[this.cursor] = url;
  }

  public get current(): string | undefined {
    return this.entries[this.cursor];
  }

  public visit(url: string): void {
    this.entries.length = this.cursor + 1;
    this.entries.push(url);
    this.cursor = this.entries.length - 1;
  }

  public goBack(): void {
    if (this.cursor - 1 < 0) return;
    this.cursor--;
  }

  public forward(): void {
    if (this.cursor + 1 > this.entries.length - 1) return;
    this.cursor++;
  }
}

// Example
const bh = new BrowserHistory("X");
bh.visit("A");
bh.visit("B");
bh.goBack();
bh.goBack();

export {};
