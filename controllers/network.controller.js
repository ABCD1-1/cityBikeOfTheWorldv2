const NetworkModel = require("../models/network.model");

module.exports.getNetworks = async (req, res) => {
  let networks = {};
  if (req.body.city) {
    networks = await NetworkModel.find({ city: req.body.city });
  } else if (req.body.name) {
    networks = await NetworkModel.find({ name: req.body.name });
  } else if (req.body.city && req.body.name) {
    networks = await NetworkModel.find({
      city: req.body.city,
      name: req.body.name,
    });
  } else {
    networks = await NetworkModel.find();
  }
  return res.json({ networks });
};

module.exports.addNetwork = async (req, res) => {
  const reqBody = req.body;
  if (reqBody.name && reqBody.city && reqBody.country && reqBody.company) {
    const networkCreated = {
      name: reqBody.name,
      city: reqBody.city,
      country: reqBody.country,
      company: reqBody.company,
      id: reqBody.id ? reqBody.id : reqBody.name + "-" + reqBody.city,
    };
    await NetworkModel.insertMany(networkCreated);
    console.log(networkCreated);
    return res.json({ createdNetwork: networkCreated });
  } else {
    const message =
      "Error, the payload need to contain these properties : name, company, city, country";
    return res.json({ message });
  }
};

module.exports.modifyNetworks = async (req, res) => {
  let updatedProperties = [];
  if (req.body.name && req.body.newName) {
    await NetworkModel.updateMany(
      { name: req.body.name },
      { $set: { name: req.body.newName } }
    );
    updatedProperties.push({
      oldName: req.body.name,
      newName: req.body.newName,
    });
  }
  if (req.body.company && req.body.newCompany) {
    await NetworkModel.updateMany(
      { company: req.body.company },
      { $set: { company: req.body.newCompany } }
    );
    updatedProperties.push({
      oldCompany: req.body.company,
      newCompany: req.body.newCompany,
    });
  }
  if (req.body.company && req.body.newCompany) {
    await NetworkModel.updateMany(
      { company: req.body.company },
      { $set: { company: req.body.newCompany } }
    );
    updatedProperties.push({
      oldCompany: req.body.company,
      newCompany: req.body.newCompany,
    });
  }
  if (req.body.city && req.body.newCity) {
    await NetworkModel.updateMany(
      { city: req.body.city },
      { $set: { city: req.body.newCity } }
    );
    updatedProperties.push({
      oldCity: req.body.city,
      newCity: req.body.newCity,
    });
  }
  if (req.body.country && req.body.newCountry) {
    await NetworkModel.updateMany(
      { country: req.body.country },
      { $set: { country: req.body.newCountry } }
    );
    updatedProperties.push({
      oldCountry: req.body.country,
      newCountry: req.body.newCountry,
    });
  }
  if (updatedProperties.length) {
    return res.json({
      updatedProperties,
    });
  } else {
    const message =
      "Error, the payload need to contain at least one of these properties : name, company, city, country; with its the associated modification: newName, newCompany, newCity, newCountry";
    return res.json({ message });
  }
};

// INITIALIZATION

module.exports.deleteAllFromNetworkModel = async () => {
  // Delete everything in the database
  try {
    var myquery = { id: { $ne: "0" } };
    await NetworkModel.deleteMany(myquery);
  } catch (err) {
    console.log(err);
  }
};

module.exports.initDatabase = async (lightNetworks) => {
  try {
    await NetworkModel.insertMany(lightNetworks);
  } catch (err) {
    console.log(err);
  }
};
