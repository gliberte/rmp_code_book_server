const _ = require("lodash");

module.exports = data => {
  return {
    type: "FeatureCollection",
    features: data.map(item => ({
      type: "Feature",
      geometry: item.geom,
      properties: _.omit(item, ["geom"])
    }))
  };
};
