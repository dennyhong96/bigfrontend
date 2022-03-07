type Callback = (...args: any[]) => void;

export class EventEmitter {
  private store: Map<string, Map<symbol, Callback>>;

  constructor() {
    this.store = new Map();
  }

  subscribe(eventName: string, callback: Callback) {
    const callbackKey = Symbol();
    if (this.store.has(eventName)) {
      const callbacksMap = this.store.get(eventName)!;
      callbacksMap.set(callbackKey, callback);
    } else {
      const callbacksMap = new Map<symbol, Callback>();
      callbacksMap.set(callbackKey, callback);
      this.store.set(eventName, callbacksMap);
    }
    return {
      release: () => {
        this.store.get(eventName)!.delete(callbackKey);
      },
    };
  }

  emit(eventName: string, ...args: any[]) {
    if (!this.store.has(eventName)) return;
    const callbacksMap = this.store.get(eventName)!;
    for (const callback of callbacksMap.values()) {
      callback(...args);
    }
  }
}
