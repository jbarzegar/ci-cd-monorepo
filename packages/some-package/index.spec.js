let { add, sub } = require(".");

test("should add", () => {
  let expected = 10;

  let sum = add(5, 5);

  expect(sum).toEqual(expected);
});

test("should sub", () => {
  let expected = 5;

  let sum = sub(10, 5);

  expect(sum).toEqual(expected);
});
