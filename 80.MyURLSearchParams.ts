export class MyURLSearchParams {
  private URLPrefix: string | null;
  private queryMap: Map<string, string[]>;

  constructor(queryString: string) {
    const regex = new RegExp(/^.*\?/);
    if (queryString.match(regex)) {
      this.URLPrefix = queryString.match(regex)![0];
    } else {
      this.URLPrefix = null;
    }
    queryString = queryString.replace(regex, "");
    const queryEntries = queryString.split("&").map((p) => p.split("="));
    this.queryMap = new Map<string, string[]>();
    for (const [key, value] of queryEntries) {
      this.append(key, value);
    }
  }

  public append(name: string, value: string | number) {
    if (this.queryMap.has(name)) {
      this.queryMap.get(name)!.push(`${value}`);
    } else {
      this.set(name, value);
    }
  }

  public delete(name: string) {
    this.queryMap.delete(name);
  }

  public *entries(): Generator<string[]> {
    for (const [key, values] of this.queryMap) {
      for (const v of values) {
        yield [key, v];
      }
    }
  }

  public forEach(callback: (value: string, key: string) => void): void {
    for (const [key, values] of this.queryMap) {
      for (const v of values) {
        callback(v, key);
      }
    }
  }

  public get(name: string): string | null {
    name = this._trimKeyName(name);
    return this.queryMap.get(name)?.[0] ?? null;
  }

  public getAll(name: string): string[] {
    name = this._trimKeyName(name);
    return this.queryMap.get(name) ?? [];
  }

  public has(name: string): boolean {
    name = this._trimKeyName(name);
    return this.queryMap.has(name);
  }

  private _trimKeyName(name: string) {
    if (this.URLPrefix && name.includes(this.URLPrefix)) {
      return name.replace(this.URLPrefix, "");
    }
    return name;
  }

  public *keys(): Generator<string> {
    const keys = this.queryMap.keys();
    for (const key of keys) {
      yield key;
    }
  }

  public set(name: string, value: string | number) {
    this.queryMap.set(name, [`${value}`]);
  }

  public sort(): void {
    this.queryMap = new Map(
      Array.from(this.queryMap).sort(([keyA], [keyB]) =>
        keyA.localeCompare(keyB)
      )
    );
  }

  public toString(): string {
    return Array.from(this.queryMap).reduce((acc, [key, value], index) => {
      const str = value.reduce((a, v, i) => {
        if (i === 0) return `${key}=${v}`;
        return `${a}&${key}=${v}`;
      }, "");
      if (index === 0) return str;
      return `${acc}&${str}`;
    }, "");
  }

  public *values(): Generator<string> {
    // const values = this.queryMap.values();
    // for (const value of values) {
    //   yield value;
    // }
    const entries = this.queryMap.entries();
    let value: string[] | null = null;
    while ((value = entries.next().value)) {
      const vals = value[1];
      for (const v of vals) {
        yield v;
      }
    }
  }
}

const params = new MyURLSearchParams("?a=1&a=2&b=2");
params.get("a"); // '1'
params.getAll("a"); // ['1', '2']
params.get("b"); // '2'
params.getAll("b"); // ['2']

params.append("a", 3);
params.set("b", "3");
params.toString(); // 'a=1&a=2&b=3&a=3'

export {};
