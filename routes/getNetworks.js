const { getNetworks } = require("../controllers/network.controller");

module.exports = (app) => {
  app.get("/networks", getNetworks);
};
