const http = require("http");
require("dotenv").config();

const { loadPlanetsData } = require("./models/planets/planets.model");
const { loadLaunchData } = require("./models/launches/launches.model");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8000;

const app = require("./app");
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`🚀 Listening on port: ${PORT} ...`);
  });
}

startServer();
