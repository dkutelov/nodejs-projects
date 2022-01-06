const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// routers
const planetsRouter = require("./routes/planets/planets.route");
const launchesRouter = require("./routes/launches/launches.route");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Register routes
app.use(planetsRouter);
app.use(launchesRouter);

// After Api routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
