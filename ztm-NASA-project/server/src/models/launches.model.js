const launches = new Map(); // preserve the order of adding
let latestFlightNumber = 100;

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

function existLaunchWithId(id) {
  return launches.has(id);
}

function getAllLaunches() {
  //const launchesArr = Array.from(launches, ([_, v]) => v);
  return Array.from(launches.values()); //launches.values() - iterable
}

function createLaunch(launch) {
  latestFlightNumber++;

  const newLaunch = Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true
  });
  launches.set(latestFlightNumber, newLaunch);
}

function deleteLaunch(id) {
  //do not delete -> keep data
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  createLaunch,
  existLaunchWithId,
  deleteLaunch
};
