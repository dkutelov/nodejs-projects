const express = require("express");

// routers
const planetsRouter = require("./planets/planets.route");
const launchesRouter = require("./launches/launches.route");

const api = express.Router();

// Register routes
api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;
