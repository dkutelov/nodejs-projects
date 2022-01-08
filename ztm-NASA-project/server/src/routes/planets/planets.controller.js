const { getAllPlanets } = require("../../models/planets/planets.model");

async function httpGetAllPlanets(req, res) {
  // return is not used by express - only to stop execution and not set res second time
  return res.status(200).json(await getAllPlanets());
}

module.exports = {
  httpGetAllPlanets
};
