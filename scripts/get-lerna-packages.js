let { exec, execSync } = require("child_process");
let { promisify } = require("util");
let { lernaCmd } = require("./utils").paths;

let lernaArgs = "list -p -a --json";

let getLernaPackages = (lerna = lernaCmd) =>
  promisify(exec)(`${lerna} ${lernaArgs}`).then(({ stdout }) =>
    Promise.resolve(stdout)
  );

if (require.main === module) {
  getLernaPackages().then(packages => process.stdout.write(packages));
} else {
  module.exports = getLernaPackages;
  module.exports.sync = () =>
    execSync(`${lernaCmd} ${lernaArgs}`, {
      encoding: "utf8",
      stdio: "pipe"
    });
}
