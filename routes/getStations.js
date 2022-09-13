const { getStations } = require("../controllers/station.controller");

module.exports = (app) => {
  app.get("/stations", getStations);
};
