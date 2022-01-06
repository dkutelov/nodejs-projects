const launches = new Map(); // preserve the order

const launch = {
  flightNumber: 100,
  mission: "Kepler X",
  rocket: "Explorer",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler 422b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true
};

// use as key the field mostly used for search
launches.set(launch.flightNumber, launch);

module.exports = {
  launches
};
