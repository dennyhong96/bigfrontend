type ToBe = (match: any) => void;
interface INot {
  toBe: ToBe;
}
interface IMyExpectReturn {
  toBe: ToBe;
  not: INot;
}

export function myExpect(input: any) {
  function toBe(this: IMyExpectReturn | INot, match: any) {
    const is = Object.is(match, input);
    if ((this === not && is) || (this !== not && !is)) {
      throw new Error();
    }
  }

  const not = { toBe };

  return {
    toBe,
    not,
  };
}
