let path = require("path");
let fs = require("fs");

let { promisify } = require("util");

let readFile = promisify(fs.readFile);
let exec = promisify(require("child_process").exec);

const ROOT_PATH = path.join(__dirname, "..");
const NODE_BIN = path.resolve(ROOT_PATH, "node_modules/.bin");
const lernaCmd = path.join(NODE_BIN, "lerna");

let getLernaPackages = (lerna = lernaCmd) =>
  exec(`${lerna} list -p -a --json`).then(({ stdout }) =>
    Promise.resolve(stdout)
  );

let readLockFile = async ({ name, location }) => {
  let lockFile = path.resolve(location, "yarn.lock");

  if (!fs.existsSync(lockFile)) {
    return undefined;
  }

  let contents = await readFile(lockFile, "utf8");

  return { name, contents };
};

let createDivider = name => `\n\n# ----------- ${name} -----------\n\n`;

let main = async () => {
  let packages = JSON.parse(await getLernaPackages());
  let lockFiles = (
    await Promise.all(
      [{ name: "root", location: ROOT_PATH }, ...packages].map(readLockFile)
    )
  ).filter(Boolean);

  let file = lockFiles.reduce(
    (a, b) => a + createDivider(b.name) + b.contents,
    ""
  );

  process.stdout.write(file);
};

main();
