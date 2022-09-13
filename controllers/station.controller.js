const NetworkModel = require("../models/network.model");
const axios = require("axios");

module.exports.getStations = async (req, res) => {
  var totalStations = 0;
  if (req.body.country) {
    var totalStations = [];
    var okReturn = 0;
    const targetNetworks = await NetworkModel.find(
      { country: req.body.country },
      { id: 1 } // return only the id (and _id by default)
    );
    targetNetworks.map(async (network) => {
      const path = `http://api.citybik.es/v2/networks/${network.id}?fields=stations`;
      await axios.get(path).then(async (res) => {
        totalStations += await parseInt(res.data.network.stations.length);
      });
    });

    setTimeout(() => {
      return res.json({ totalStations });
    }, "500");


  } else {
    const message = "Error, please specify the country code (ex: FR, DE, ...)";
    return res.json({ message });
  }
};
