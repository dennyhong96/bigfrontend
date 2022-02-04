import { Observable, Observer } from "./57.Observable";

interface ISub<T> {
  subscriber: Observer<T>;
  unsubed: boolean;
}

class Subject<T> {
  private subscribers: ISub<T>[];

  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber: Observer<T>) {
    const sub: ISub<T> = {
      subscriber,
      unsubed: false,
    };
    this.subscribers.push(sub);
    return {
      unsubscribe: () => {
        sub.unsubed = true;
      },
    };
  }

  next = (val: T) => {
    this.subscribers.forEach((sub) => {
      if (sub.unsubed) return;
      if (typeof sub.subscriber === "function") {
        sub.subscriber(val);
      } else {
        sub.subscriber.next?.(val);
      }
    });
  };

  error = (err: any) => {
    this.subscribers.forEach((sub) => {
      if (sub.unsubed) return;
      if (typeof sub.subscriber === "function") return;
      sub.subscriber.error?.(err);
    });
  };

  complete = () => {
    this.subscribers.forEach((sub) => {
      if (sub.unsubed) return;
      if (typeof sub.subscriber === "function") return;
      sub.subscriber.complete?.();
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
