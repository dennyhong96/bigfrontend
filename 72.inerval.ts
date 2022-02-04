import { Observable } from "./57.Observable";

export function interval(period: number) {
  return new Observable<number>((observer) => {
    const next = typeof observer === "function" ? observer : observer.next;
    let currentInterval = 0;
    let intervalId = setInterval(() => {
      if (currentInterval >= period) clearInterval(intervalId);
      next?.(currentInterval++);
    }, 1000);
  });
}
