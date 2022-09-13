const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const db = require("./config/db");
const { convertToLightNetwork } = require("./helpers");
// const NetworkModel = require("./models/network.model");
const {
  deleteAllFromNetworkModel,
  initDatabase,
} = require("./controllers/network.controller");
require("dotenv").config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// call the API, delete and init database

axios
  .get("http://api.citybik.es/v2/networks?fields=id,name,company,location")
  .then((res) => {
    return convertToLightNetwork(res.data.networks.slice(0, 80)); //cannot got much further because async is not handled ??
  })
  .then(async (lightNetworks) => {
    await deleteAllFromNetworkModel();
    await initDatabase(lightNetworks);
  });

// routes

require("./routes/getNetworks")(app);
require("./routes/addNetworks")(app);
require("./routes/modifyNetworks")(app);
require("./routes/getStations")(app);

// server
app.listen(process.env.PORT, () => {
  console.log(`Application launched at http://localhost:${PORT}`);
});
