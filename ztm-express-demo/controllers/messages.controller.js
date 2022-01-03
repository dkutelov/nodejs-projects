const path = require("path");

function getMessges(req, res) {
  const imgPath = path.join(__dirname, "..", "public", "arcane.jpeg");
  res.sendFile(imgPath);
}

function postMessage(req, res) {
  console.log("Updating messages");
}

module.exports = {
  getMessges,
  postMessage
};
