const express = require("express");

const launchesRouter = express.Router();
const {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpAbortLaunch
} = require("./launches.controller");

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpCreateLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
