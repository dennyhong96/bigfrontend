declare global {
  interface Node {
    __storeId__: symbol | undefined;
  }
}

export class NodeStore<T> {
  private store: Record<symbol, T> = {};

  public set(node: Node, value: T): void {
    const key = (node.__storeId__ = node.__storeId__ ?? Symbol());
    this.store[key] = value;
  }

  public get(node: Node): T | undefined {
    if (!this.has(node)) return;
    return this.store[node.__storeId__!];
  }

  public has(node: Node): boolean {
    const key = node.__storeId__;
    return Boolean(key && this.store[key]);
  }
}
