const axios = require("axios");

const launches = require("./launches.mongo");
const planets = require("../planets/planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function existLaunchWithId(id) {
  return await findLaunch({ flightNumber: id });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne({}).sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches(limit, skip) {
  return await launches
    .find({}, { _id: 0, __v: 0 })
    .sort({
      flightNumber: 1
    })
    .limit(limit)
    .skip(skip);
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
  const planet = await planets.findOne({ keplerName: launch.target });

  //Best practice to use Node Error object instead of returning undefined
  if (!planet) {
    throw new Error("No Planet found!");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNumber
  });
  await saveLaunch(newLaunch);
}

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function populateLaunches() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1
          }
        },
        {
          path: "payloads",
          select: {
            customers: 1
          }
        }
      ]
    }
  });

  if (response.status !== 200) {
    console.log("Problem downloading launches!");
    throw new Error("Launch data download failed!");
  }
  const launchesDocs = response.data.docs;

  for (const launchDoc of launchesDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((x) => x.customers);

    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc["rocket"].name,
      launchDate: launchDoc.date_local,
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      customers
    };

    await saveLaunch(launch);
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat"
  });

  if (firstLaunch) {
    console.log("Launch data already loaded!");
  } else {
    await populateLaunches();
  }
}

module.exports = {
  getAllLaunches,
  existLaunchWithId,
  abortLaunch,
  scheduleNewLaunch,
  loadLaunchData
};
