type MySetInterval = {
  (func: (...args: any[]) => void, delay: number, period: number): number;
  _intervalIds: (number | undefined)[];
};

export const mySetInterval: MySetInterval = (
  func: (...args: any[]) => void,
  delay: number,
  period: number
) => {
  let execCount = 0;
  const intervalId = mySetInterval._intervalIds.length;
  mySetInterval._intervalIds.push(intervalId);
  const exec = () => {
    setTimeout(() => {
      if (!mySetInterval._intervalIds.includes(intervalId)) return;
      func();
      execCount++;
      exec();
    }, delay + period * execCount);
  };
  exec();
  return intervalId;
};
mySetInterval._intervalIds = [];

export function myClearInterval(intervalId: number) {
  mySetInterval._intervalIds[intervalId] = undefined;
}

let prev = Date.now();
const func = () => {
  const now = Date.now();
  console.log("roughly ", Date.now() - prev);
  prev = now;
};

const id = mySetInterval(func, 100, 200);

// roughly 100, 100 + 200 * 0
// roughly 400,  100 + 200 * 1
// roughly 900,  100 + 200 * 2
// roughly 1600,  100 + 200 * 3
// ....

setTimeout(() => {
  myClearInterval(id);
}, 50); // stop the interval
