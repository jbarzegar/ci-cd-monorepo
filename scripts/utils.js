let path = require("path");

const ROOT_PATH = path.join(__dirname, "..");
const NODE_BIN = path.resolve(ROOT_PATH, "node_modules/.bin");
const lernaCmd = path.join(NODE_BIN, "lerna");

module.exports = {
  paths: {
    ROOT_PATH,
    NODE_BIN,
    lernaCmd
  }
};
