let path = require("path");
let fs = require("fs");

console.log("hello world");

let { promisify } = require("util");
let readFile = promisify(fs.readFile);

let getLernaPackages = require("./get-lerna-packages");
let { paths } = require("./utils");

let readLockFile = async ({ name, location }) => {
  let lockFile = path.resolve(location, "yarn.lock");

  if (!fs.existsSync(lockFile)) {
    return undefined;
  }

  let contents = await readFile(lockFile, "utf8");

  return { name, contents };
};

let createDivider = (name) => `\n\n# ----------- ${name} -----------\n\n`;

let main = async () => {
  let packages = JSON.parse(await getLernaPackages());

  let lockFileBuffers = await Promise.all(
    [{ name: "root", location: paths.ROOT_PATH }, ...packages].map(readLockFile)
  );

  let combinedLockFile = lockFileBuffers
    .filter(Boolean)
    .reduce(
      (lockFile, { name, contents }) =>
        lockFile + createDivider(name) + contents,
      ""
    );

  process.stdout.write(combinedLockFile);
};

main();
