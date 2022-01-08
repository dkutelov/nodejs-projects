const {
  getAllLaunches,
  createLaunch,
  existLaunchWithId,
  deleteLaunch
} = require("../../models/launches/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpCreateLaunch(req, res) {
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
  createLaunch(launch);

  //good practice to return what was created
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const id = +req.params.id;

  // if launch does not exists
  if (!existLaunchWithId(id)) {
    return res.status(404).json({
      error: "Launch not found"
    });
  }

  // if launch exists
  const abortedLaunch = deleteLaunch(id);
  return res.status(200).json(abortedLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpAbortLaunch
};
