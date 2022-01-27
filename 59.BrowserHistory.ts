class BrowserHistory {
  private entries: (string | undefined)[];
  private pointer: number;

  constructor(url?: string) {
    this.entries = [];
    this.pointer = 0;
    if (url) this.entries[this.pointer] = url;
  }

  public get current(): string | undefined {
    return this.entries[this.pointer];
  }

  public visit(url: string): void {
    this.entries.length = this.pointer + 1;
    this.entries.push(url);
    this.pointer = this.entries.length - 1;
  }

  public goBack(): void {
    if (this.pointer - 1 < 0) return;
    this.pointer--;
  }

  public forward(): void {
    if (this.pointer + 1 > this.entries.length - 1) return;
    this.pointer++;
  }
}

// Example
const bh = new BrowserHistory("X");
bh.visit("A");
bh.visit("B");
bh.goBack();
bh.goBack();

export {};
