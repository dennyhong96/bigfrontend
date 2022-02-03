import { Observable } from "./57.Observable";

function from(
  input: Array<any> | ArrayLike<any> | Promise<any> | Iterable<any> | Observable
): Observable {
  // Handle Promise
  if (input instanceof Promise) {
    return new Observable((sub) => {
      input
        .then((res) => {
          sub.next(res);
        })
        .catch((err) => {
          sub.error(err);
        })
        .finally(() => {
          sub.complete();
        });
    });
  }

  // Handle Observable
  if (input instanceof Observable) {
    // return new Observable((sub) => {
    //   input.subscribe(sub);
    // });
    return input;
  }

  // Handle Array & ArrayLike
  if (Array.isArray(input) || "length" in input) {
    return new Observable((sub) => {
      for (let i = 0; i < input.length; i++) {
        const el = input[i];
        sub.next(el);
      }
      sub.complete();
    });
  }

  // Handle Iterable
  if (typeof input[Symbol.iterator] === "function") {
    return new Observable((sub) => {
      try {
        for (const el of input) {
          sub.next(el);
        }
      } catch (err) {
        sub.error(err);
      }
      sub.complete();
    });
  }

  throw new Error();
}

export {};
