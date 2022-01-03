const express = require("express");
const path = require("path");

const messagesController = require("./controllers/messages.controller");
const friendsRouter = require("./routes/friends.router");

const app = express();

const PORT = 4000;

const friends = [
  {
    id: 0,
    name: "Joe Doe"
  }
];

app.use((req, res, next) => {
  const time = Date.now();

  next();
  const delta = Date.now() - time; //in ms
  console.log(`${req.method} - ${req.baseUrl}${req.url} - ${delta}ms`);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/friends", friendsRouter);

app.get("/messages", messagesController.getMessges);
app.post("/messages", messagesController.postMessage);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}!`);
});
