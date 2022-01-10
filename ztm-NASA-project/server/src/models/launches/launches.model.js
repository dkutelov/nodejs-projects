const launches = require("./launches.mongo");
const planets = require("../planets/planets.mongo");
//const launches = new Map(); // preserve the order of adding

const DEFAULT_FLIGHT_NUMBER = 100;
//let latestFlightNumber = 100;

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

async function existLaunchWithId(id) {
  //return launches.has(id);
  return await launches.findOne({ flightNumber: id });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne({}).sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  //const launchesArr = Array.from(launches, ([_, v]) => v);
  // return Array.from(launches.values()); //launches.values() - iterable
  return await launches.find({}, { _id: 0, __v: 0 });
}

//function createLaunch(launch) {
//latestFlightNumber++;
// const newLaunch = Object.assign(launch, {
//   flightNumber: latestFlightNumber,
//   customer: ["ZTM", "NASA"],
//   upcoming: true,
//   success: true
// });
// launches.set(latestFlightNumber, newLaunch);
//}

async function abortLaunch(launchFlightNumber) {
  //do not delete -> keep data
  // const aborted = launches.get(id);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
  const aborted = await launches.updateOne(
    {
      flightNumber: launchFlightNumber
    },
    {
      upcoming: false,
      success: false
    }
  );

  return aborted.acknowledged && aborted.modifiedCount === 1;
}

async function saveLaunch(launch) {
  //use mongo model not launches.model
  const planet = await planets.findOne({ keplerName: launch.target });

  //Best practice to use Node Error object instead of returning undefined
  if (!planet) {
    throw new Error("No Planet found!");
  }

  // await launches.updateOne - returns mongoose field as well
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber
    },
    launch,
    {
      upsert: true
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNumber
  });
  console.log(newLaunch);
  await saveLaunch(newLaunch);
}

module.exports = {
  getAllLaunches,
  existLaunchWithId,
  abortLaunch,
  scheduleNewLaunch
};
