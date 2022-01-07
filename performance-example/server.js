const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // difference in ms
    // event loop will be blocked!
  }
}

app.get("/", (req, res) => {
  res.send(`Performance example. ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding, ding, ding ... ${process.pid}`);
});

console.log("Running server.js ...");
if (cluster.isMaster) {
  console.log(`Master has been started! ${process.pid}.`);
  const NUMBER_OF_WORKERS = os.cpus().length;
  for (let index = 0; index < NUMBER_OF_WORKERS; index++) {
    console.log("Fork created!");
    cluster.fork();
  }
} else {
  // start server in workers
  console.log(`Worker process started ${process.pid}`);
  app.listen(3000, () => {
    console.log("Server started");
  });
}
