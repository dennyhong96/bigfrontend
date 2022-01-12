interface IOriginal {
  setTimeout: typeof setTimeout;
  clearTimeout: typeof clearTimeout;
  dateNow: typeof Date.now;
}

interface ITask {
  callback: (...args: any[]) => void;
  delay: number;
  args: any[];
  timeoutId: number;
}

class FakeTimer {
  private original: IOriginal;
  private timeoutId: number;
  private currTime: number;
  private taskQueue: ITask[];

  constructor() {
    this.original = {
      setTimeout: window.setTimeout,
      clearTimeout: window.clearTimeout,
      dateNow: Date.now,
    };
    this.timeoutId = 1;
    this.currTime = 0;
    this.taskQueue = [];
  }

  public install(): void {
    // @ts-ignore
    window.setTimeout = this.setTimeout.bind(this);
    // @ts-ignore
    window.clearTimeout = this.clearTimeout.bind(this);
    Date.now = () => this.currTime;
  }

  private setTimeout(
    callback: (...args: any[]) => void,
    delay: number,
    ...args: any[]
  ): number {
    const timeoutId = this.timeoutId;
    this.taskQueue.push({
      timeoutId,
      callback,
      delay: delay + this.currTime,
      args,
    });
    this.taskQueue.sort((a, b) => a.delay - b.delay);
    this.timeoutId++;
    return timeoutId;
  }

  private clearTimeout(timeoutId: number): void {
    const taskIndex = this.taskQueue.findIndex(
      (task) => task.timeoutId === timeoutId
    );
    if (taskIndex < 0) return;
    this.taskQueue.splice(taskIndex, 1);
  }

  public uninstall(): void {
    if (!this.original) return;
    window.setTimeout = this.original.setTimeout;
    window.clearTimeout = this.original.clearTimeout;
    Date.now = this.original.dateNow;
  }

  public tick(): void {
    while (this.taskQueue.length) {
      const { callback, delay, args } = this.taskQueue.shift()!;
      this.currTime = delay;
      callback(...args);
    }
  }
}

// Example
const fakeTimer = new FakeTimer();
fakeTimer.install();

const logs: [number, string][] = [];
const log = (arg: string) => {
  logs.push([Date.now(), arg]);
};

setTimeout(() => log("A"), 100); // log 'A' at 100

const b = setTimeout(() => log("B"), 110);
clearTimeout(b); // b is set but cleared

setTimeout(() => log("C"), 200); // log 'C' at 200

fakeTimer.tick();
console.log(logs); // [[100, "A"],[200, "C"]]

fakeTimer.uninstall();
