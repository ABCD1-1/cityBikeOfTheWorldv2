const { modifyNetworks } = require("../controllers/network.controller");

module.exports = (app) => {
  app.put("/networks", modifyNetworks);
};