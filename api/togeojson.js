const _ = require("lodash");

module.exports = data => {
  return {
    type: "FeatureCollection",
    features: data.map(item => ({
      id:item.id || undefined,
      type: "Feature",
      geometry: JSON.parse(item.geom),
      properties: _.omit(item, ["geom","id"])
    }))
  };
};
