declare global {
  interface Node {
    __storeId__: symbol | undefined;
  }
}

// The idea is to come up with a way to create a unique id per node
export class NodeStore<T> {
  private store: Record<symbol, T> = {};

  public set(node: Node, value: T): void {
    const key = this.getStoreId(node);
    this.store[key] = value;
  }

  public get(node: Node): T | undefined {
    const key = this.getStoreId(node);
    return this.store[key];
  }

  public has(node: Node): boolean {
    const key = this.getStoreId(node);
    return Boolean(this.store[key]);
  }

  private getStoreId(node: Node): symbol {
    const key = node.__storeId__ ?? Symbol();
    node.__storeId__ = key;
    return key;
  }
}
