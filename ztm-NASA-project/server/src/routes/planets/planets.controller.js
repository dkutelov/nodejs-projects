const planets = require("../../models/planets.model");

function getAllPlanets(req, res) {
  // return is not used by express - only to stop execution and not set res second time
  return res.status(200).json(planets);
}

module.exports = {
  getAllPlanets
};
