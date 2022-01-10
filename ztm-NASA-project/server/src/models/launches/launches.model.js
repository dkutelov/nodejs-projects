const launches = require("./launches.mongo");
const planets = require("../planets/planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

async function existLaunchWithId(id) {
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
  return await launches.find({}, { _id: 0, __v: 0 });
}

async function abortLaunch(launchFlightNumber) {
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
  await saveLaunch(newLaunch);
}

module.exports = {
  getAllLaunches,
  existLaunchWithId,
  abortLaunch,
  scheduleNewLaunch
};
