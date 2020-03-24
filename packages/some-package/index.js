let _ = "_";

export let curry = (fn, initialArgs = []) => (...args) => {
  let mergedArgs = [...initialArgs, ...args].filter(x => x !== _);
  return fn.length >= mergedArgs ? curry(fn, mergedArgs) : fn(...mergedArgs);
};

export let add = curry((a, b) => a + b);
export let sub = curry((a, b) => a - b);
export let mul = curry((a, b) => a * b);
export let div = curry((a, b) => a / b);
