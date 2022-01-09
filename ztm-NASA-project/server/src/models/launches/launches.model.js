const launches = require("./launches.mongo");
const planets = require("../planets/planets.mongo");
//const launches = new Map(); // preserve the order of adding

let latestFlightNumber = 100;

// const launch = {
//   flightNumber: 100,
//   mission: "Kepler X",
//   rocket: "Explorer",
//   launchDate: new Date("December 27, 2030"),
//   target: "Kepler 422b",
//   customer: ["ZTM", "NASA"],
//   upcoming: true,
//   success: true
// };

// saveLaunch(launch);
// use as key the field mostly used for search
//launches.set(launch.flightNumber, launch);

function existLaunchWithId(id) {
  //return launches.has(id);
}

async function getAllLaunches() {
  //const launchesArr = Array.from(launches, ([_, v]) => v);
  // return Array.from(launches.values()); //launches.values() - iterable
  return await launches.find({}, { _id: 0, __v: 0 });
}

function createLaunch(launch) {
  //latestFlightNumber++;
  // const newLaunch = Object.assign(launch, {
  //   flightNumber: latestFlightNumber,
  //   customer: ["ZTM", "NASA"],
  //   upcoming: true,
  //   success: true
  // });
  // launches.set(latestFlightNumber, newLaunch);
}

function deleteLaunch(id) {
  //do not delete -> keep data
  // const aborted = launches.get(id);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
  return {};
}

async function saveLaunch(launch) {
  //use mongo model not launches.model
  const planet = await planets.findOne({ keplerName: launch.target });

  //Best practice to use Node Error object instead of returning undefined
  if (!planet) {
    throw new Error("No Planet found!");
  }

  await launches.updateOne(
    {
      flightNumber: launch.latestFlightNumber
    },
    { ...launch, flightNumber: latestFlightNumber, customers: ["ZTM", "NASA"] },
    {
      upsert: true
    }
  );
}

module.exports = {
  getAllLaunches,
  createLaunch,
  existLaunchWithId,
  deleteLaunch,
  saveLaunch
};
