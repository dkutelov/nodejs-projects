const express = require("express");
const { restart } = require("nodemon");

const app = express();

const PORT = 4000;

const friends = [
  {
    id: 1,
    name: "Joe Doe"
  }
];

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:id", (req, res) => {
  const { id } = req.params;
  const friend = friends[+id];
  if (friend) {
    res.json(friends[id]);
  } else {
    res.status(404).json({ error: "Friend does not exists!" });
  }
});

app.get("/messages", (req, res) => {
  res.send("<h1>Hello<h1>");
});

app.post("/messages", (req, res) => {
  console.log("Updating messages");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}!`);
});
