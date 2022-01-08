const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = require("./app");
const { loadPlanetsData } = require("./models/planets/planets.model");

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

async function startServer() {
  await mongoose.connect(process.env.MONGO_URI);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`🚀 Listening on port: ${PORT} ...`);
  });
}

startServer();
