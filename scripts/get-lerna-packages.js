#!/usr/bin/env node

let { exec, execSync } = require("child_process");
let { promisify } = require("util");
let { paths, isRequired } = require("./utils");
let { lernaCmd } = paths;

let lernaArgs = "list -p -a --json";

let getLernaPackages = (lerna = lernaCmd) =>
  promisify(exec)(`${lerna} ${lernaArgs}`).then(({ stdout }) =>
    Promise.resolve(stdout)
  );

if (isRequired()) {
  module.exports = getLernaPackages;
  module.exports.sync = () =>
    execSync(`${lernaCmd} ${lernaArgs}`, {
      encoding: "utf8",
      stdio: "pipe"
    });
} else {
  getLernaPackages().then(packages => process.stdout.write(packages));
}
