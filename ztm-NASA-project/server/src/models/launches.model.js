const launches = new Map(); // preserve the order of adding

const launch = {
  flightNumber: 100,
  mission: "Kepler X",
  rocket: "Explorer",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler 422b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true
};

// use as key the field mostly used for search
launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  //const launchesArr = Array.from(launches, ([_, v]) => v);
  return Array.from(launches.values()); //launches.values() - iterable
}

module.exports = {
  getAllLaunches
};
