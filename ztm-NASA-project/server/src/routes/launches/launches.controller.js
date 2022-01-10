const {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunch
} = require("../../models/launches/launches.model");
const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { limit, skip } = getPagination(req.query);
  const launches = await getAllLaunches(limit, skip);
  return res.status(200).json(launches);
}

async function httpCreateLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(400).json({ error: "Missing required launch data!" });
  }

  // isNaN(launch.launchDate) - valid date returns false
  // it calls date.valueOf() - number
  // launch.launchDate.toString() === "Invalid Date"
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invlid launch date!" });
  }

  launch.launchDate = new Date(launch.launchDate);

  try {
    await scheduleNewLaunch(launch);
  } catch (error) {
    console.error(error);
  }

  //good practice to return what was created
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchFlightNumber = +req.params.id;
  const existingLaunch = await existLaunchWithId(launchFlightNumber);
  // if launch does not exists
  if (!existingLaunch) {
    return res.status(404).json({
      error: "Launch not found"
    });
  }

  // if launch exists
  const abortedLaunch = await abortLaunch(launchFlightNumber);
  if (!abortedLaunch) {
    return res.status(400).json({ error: "Launch Not Aborted" });
  }

  return res.status(200).json({ ok: true });
}

module.exports = {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpAbortLaunch
};
