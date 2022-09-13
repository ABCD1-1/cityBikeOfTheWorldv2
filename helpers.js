exports.convertToLightNetwork = (networks) => {
  const networksLighted = [];
  networks.map((network) => {
    if (network.location) {
      const location = network.location;
      delete network.location;
      network.city = location.city;
      network.country = location.country;
      networksLighted.push(network);
    }
  });

  return networksLighted;
};
