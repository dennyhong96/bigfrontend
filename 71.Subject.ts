import { Observable, Observer } from "./57.Observable";

class Subject<T> {
  private subcribersMap: Map<Symbol, Observer<T>>;

  constructor() {
    this.subcribersMap = new Map<Symbol, Observer<T>>();
  }

  public subscribe(subscriber: Observer<T>) {
    const key = Symbol();
    this.subcribersMap.set(key, subscriber);
    return {
      unsubscribe: () => {
        this.subcribersMap.delete(key);
      },
    };
  }

  public next = (val: T) => {
    this.subcribersMap.forEach((subscriber) => {
      if (typeof subscriber === "function") {
        subscriber(val);
      } else {
        subscriber.next?.(val);
      }
    });
  };

  public error = (err: any) => {
    this.subcribersMap.forEach((subscriber) => {
      if (typeof subscriber === "function") return;
      subscriber.error?.(err);
    });
  };

  public complete = () => {
    this.subcribersMap.forEach((subscriber) => {
      if (typeof subscriber === "function") return;
      subscriber.complete?.();
    });
  };
}

// Example
const result: number[] = [];
const log = (item: number) => result.push(item);
const subject = new Subject<number>();
const sub1 = subject.subscribe(log);
const sub2 = subject.subscribe(log);
const sub3 = subject.subscribe(log);

const observer = new Observable<number>((subscriber) => {
  setTimeout(() => {
    subscriber.next(1);
    sub2.unsubscribe();
  }, 0);

  setTimeout(() => {
    subscriber.next(2);
  }, 100);

  setTimeout(() => subscriber.next(3), 200);
});

observer.subscribe(subject);

setTimeout(() => {
  console.log(result); // [1,1,1,2,2,3,3]
}, 300);
