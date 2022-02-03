interface IObserver<T = any> {
  next?: (value: T) => void;
  error?: (error: any) => void;
  complete?: () => void;
}
type ObserverFn<T = any> = (value: T) => void;
type Observer<T = any> = IObserver<T> | ObserverFn<T>;
type SetupFunction<T> = (observer: Required<IObserver<T>>) => void;

class Observable<T = any> {
  private setup: SetupFunction<T>;

  constructor(setup: SetupFunction<T>) {
    this.setup = setup;
  }

  public subscribe(subscriber: Observer<T>) {
    let completed = false;

    this.setup({
      next: (value) => {
        if (completed) return;
        if (typeof subscriber === "function") {
          subscriber(value);
        } else {
          subscriber.next?.(value);
        }
      },
      error: (error) => {
        if (completed) return;
        if (typeof subscriber === "function") return;
        subscriber.error?.(error);
        completed = true;
      },
      complete: () => {
        if (completed) return;
        if (typeof subscriber === "function") return;
        subscriber.complete?.();
        completed = true;
      },
    });

    return {
      unsubscribe: () => (completed = true),
    };
  }
}

const observable = new Observable<number>((subscriber: Required<IObserver>) => {
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => {
    subscriber.next(3);
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

const observer: IObserver<number> = {
  next: (value) => {
    console.log("we got a value", value);
  },
  error: (error) => {
    console.log("we got an error", error);
  },
  complete: () => {
    console.log("ok, no more values");
  },
};

// const observer = (value) => console.log('we got a value', value);

const sub = observable.subscribe(observer);
setTimeout(() => {
  // ok we only subscribe for 100ms
  sub.unsubscribe();
}, 100);

export { Observable };
