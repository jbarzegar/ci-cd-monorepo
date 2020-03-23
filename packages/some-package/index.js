let _ = "_";

let curry = (fn, initialArgs = []) => (...args) => {
  let mergedArgs = [...initialArgs, ...args].filter(x => x !== _);
  return fn.length >= mergedArgs ? curry(fn, mergedArgs) : fn(...mergedArgs);
};

let add = curry((a, b) => a + b);
let sub = curry((a, b) => a - b);
let mul = curry((a, b) => a * b);
let div = curry((a, b) => a / b);

module.exports = {
  curry,
  add,
  sub,
  mul,
  div
};
