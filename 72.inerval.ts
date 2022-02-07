import { Observable } from "./57.Observable";

function interval(period: number) {
  return new Observable<number>((observer) => {
    let n = 0;
    setInterval(() => {
      observer.next(n);
      n++;
    }, period);
  });
}
