const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPlanets(req, res) {
  // return is not used by express - only to stop execution and not set res second time
  return res.status(200).json(getAllPlanets());
}

module.exports = {
  httpGetAllPlanets
};
