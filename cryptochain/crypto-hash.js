const crypto = require("crypto"); // native node module
const cryptoHash = (...args) => {
  const hash = crypto.createHash("sha256");
  hash.update(args.sort().join(" "));
  return hash.digest("hex");
};

module.exports = cryptoHash;
