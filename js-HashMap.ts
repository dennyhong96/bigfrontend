export class HashMap<T> {
  private store: Array<Array<[string, T]>>;

  constructor() {
    this.store = [];
  }

  // O(1) time; O(1) space;
  public set(key: string, value: T): void {
    const address = this.hash(key);
    if (!this.store[address]) {
      this.store[address] = [];
    }
    this.store[address].push([key, value]);
  }

  // O(m) time; O(1) space; m is avg. entries in a bucket
  public get(key: string): T | undefined {
    const address = this.hash(key);
    if (!this.store[address]) return;
    for (const [k, v] of this.store[address]) {
      if (k === key) return v;
    }
  }

  // O(n) time; O(n) space; n is number of entries
  public keys(): string[] {
    let keys: string[] = [];
    for (const bucket of this.store) {
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
    for (const bucket of this.store) {
      if (!bucket) continue;
      for (const [_, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  // O(n) time; O(n) space; n is number of entries
  public entries(): [string, T][] {
    let result: [string, T][] = [];
    for (const bucket of this.store) {
      if (!bucket) continue;
      for (const [key, value] of bucket) {
        result.push([key, value]);
      }
    }
    return result;
  }

  // O(n) time; O(1) space; n is key length
  private hash(key: string) {
    let result = 0;
    for (let i = 0; i < key.length; i++) {
      result = result + key.charCodeAt(i);
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
