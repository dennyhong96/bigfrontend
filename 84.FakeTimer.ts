interface IOriginals {
  setInterval: typeof setInterval;
  clearInterval: typeof clearInterval;
  dateNow: typeof Date.now;
}

interface IHandler {
  func: (...args: any[]) => void;
  args: any[];
  nextExecTime: number;
  timeout: number;
  intervalId: number;
}

export class FakeTimer {
  private original: IOriginals | null = null;
  private currTime = 0;
  private nextIntervalId = 0;
  private handlers: IHandler[] = [];

  public install(): void {
    this.original = {
      setInterval: setInterval,
      clearInterval: clearInterval,
      dateNow: Date.now,
    };
    window.setInterval = this.setInterval.bind(this);
    window.clearInterval = this.clearInterval.bind(this);
    Date.now = this.dateNow.bind(this);
  }

  public setInterval(
    handler: TimerHandler,
    timeout?: number | undefined,
    ...args: any[]
  ): number {
    const intervalId = this.nextIntervalId++;
    timeout = Number.isFinite(timeout) ? timeout! : 0;
    this.handlers.push({
      func: handler as (...args: any[]) => void,
      args: args,
      nextExecTime: this.currTime + timeout,
      timeout,
      intervalId,
    });
    return intervalId;
  }

  public clearInterval(handle?: number | undefined): void {
    if (!Number.isFinite(handle)) return;
    this.handlers = this.handlers.filter((h) => h.intervalId === handle);
  }

  public dateNow(): number {
    return this.currTime;
  }

  public uninstall(): void {
    if (!this.original) return;
    window.setInterval = this.original.setInterval;
    window.clearInterval = this.original.clearInterval;
    Date.now = this.original.dateNow;
  }

  public async tick(): Promise<void> {
    if (!this.handlers.length) return;
    this.reOrderHandlers();
    const handler = this.handlers.shift()!;
    const { func, args, nextExecTime, timeout } = handler;
    this.currTime = nextExecTime;
    func(...args);
    this.handlers.push({
      ...handler,
      nextExecTime: nextExecTime + timeout,
    });
    this.tick();
  }

  private reOrderHandlers(): void {
    this.handlers.sort((a, b) =>
      a.nextExecTime - b.nextExecTime < 0 ? -1 : 1
    );
  }
}

// Example
const fakeTimer = new FakeTimer();
fakeTimer.install();

const logs: number[] = [];
const log = () => {
  logs.push(Date.now());
};

let count = 0;
const id = setInterval(() => {
  if (count > 1) {
    clearInterval(id);
  } else {
    log();
  }
  count += 1;
}, 100);

// log 'A' at every 100, stop at 200
fakeTimer.tick();
fakeTimer.uninstall();
console.log(logs); // [100, 200]
