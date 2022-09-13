const {addNetwork} = require("../controllers/network.controller");
module.exports = (app) => {
  app.post("/networks", addNetwork);
};
