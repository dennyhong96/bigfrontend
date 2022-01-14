function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }).map((_, index) => index + from);
}

// for...of... uses Iteration protocols -
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
function range2(from: number, to: number) {
  return {
    // iterable protocol
    [Symbol.iterator]() {
      return {
        next() {
          return {
            done: from > to,
            value: from++,
          };
        },
      };
    },
  };
}

// use a generator function to simplyfy iterable protocal
// a generator function returns a generator which already implements the next method
function range3(from: number, to: number) {
  return {
    // iterable protocol
    [Symbol.iterator]: function* () {
      while (from <= to) {
        yield from++;
      }
    },
  };
}

// since a generator itself is iterable, we can just use a generator function
function* range4(from: number, to: number) {
  while (from <= to) {
    yield from++;
  }
}

// Example
for (let num of range(1, 4)) {
  console.log(num);
}
