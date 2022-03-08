export class HashMap<T> {
  private data: Array<Array<[string, T]>>;

  constructor() {
    this.data = [];
  }

  // O(m) time; o(1) space; m is avg. entry count per bucket
  public set(key: string, value: T): void {
    const hash = this.hash(key);
    // handle hash conflict
    if (this.data[hash]) {
      // handle overwrite
      for (let i = 0; i < this.data[hash].length; i++) {
        const [k] = this.data[hash][i];
        if (k === key) {
          this.data[hash][i] = [key, value];
          return;
        }
      }
      this.data[hash].push([key, value]);
    } else {
      this.data[hash] = [[key, value]];
    }
  }

  // O(m) time; o(1) space; m is avg. entry count per bucket
  public get(key: string) {
    const hash = this.hash(key);
    if (!this.data[hash]) return null;
    for (const [k, v] of this.data[hash]) {
      if (k === key) return v;
    }
    return null;
  }

  // O(n) time; O(n) space; n is total entries
  public entries() {
    const result: [string, T][] = [];
    for (const bucket of this.data) {
      if (!bucket) continue;
      for (const [k, v] of bucket) {
        result.push([k, v]);
      }
    }
    return result;
  }

  // O(n) time; O(n) space; n is number of entries
  public keys(): string[] {
    let keys: string[] = [];
    for (const bucket of this.data) {
      if (!bucket) continue;
      for (const [key] of bucket) {
        keys.push(key);
      }
    }
    return keys;
  }

  // O(n) time; O(n) space; n is number of entries
  public values(): T[] {
    let values: T[] = [];
    for (const bucket of this.data) {
      if (!bucket) continue;
      for (const [_, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  // O(n) time; O(1) sapce; n is key length
  private hash(key: string): number {
    let result = 0;
    for (let i = 0; i < key.length; i++) {
      result += key.charCodeAt(i);
    }
    return result;
  }
}

// Example
const map = new HashMap<number>();
map.set("denny", 666);
map.set("sharon", 999);
map.set("d", 6);
map.set("s", 9);
console.log(map.get("denny"));
console.log(map.get("s"));
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
