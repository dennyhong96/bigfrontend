import { Observable } from "./57.Observable";

export function map<T, U>(
  transform: (arg: T) => U
): (sourceObservable: Observable<T>) => Observable<U> {
  return function (sourceObservable: Observable<T>) {
    const transformedObservable = new Observable<U>((observer) => {
      sourceObservable.subscribe((value) => {
        const transformed = transform(value);
        observer.next(transformed);
      });
    });
    return transformedObservable;
  };
}
