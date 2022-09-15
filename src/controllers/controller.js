const {
  getLatLongByPostCode,
  getSuperMarketsByLatLong,
} = require("../utils/utils");
/**
 * get super markets helper funstion
 * @param {*} lat, lon, radius, limit
 * @returns list of supermarkets | error
 */
const getSuperMarketsHelper = async ({ lat, lon, radius, limit }) => {
  try {
    const supermarkets = await getSuperMarketsByLatLong({
      lat,
      lon,
      radius,
      limit,
    });
    return supermarkets;
  } catch (error) {
    console.log("=== ERROR===", error);
    return error;
  }
};

/**
 * to get formated response
 * @param {*} supermarkets
 * @returns formatedResponse
 */
const formatResponse = (supermarkets) => {
  console.log(supermarkets, "supermarkets===========supermarkets");
  if (supermarkets.data.features.length > 0) {
    return {
      total: supermarkets.data.features.length,
      supermarkets: supermarkets.data.features,
    };
  }
  return { message: "No details found for this postcode!" };
};

/**
 * get Near By Super Markets using postcode
 * @param {*} req
 * @param {*} res
 * @returns response | error
 */
const getNearBySuperMarkets = async (req, res) => {
  const { postcode } = req.params;
  const { radius = 5000, limit = 20 } = req.query;
  try {
    // getting latitude and longitude using postcode
    const response = await getLatLongByPostCode(postcode);
    console.log(response, "I AM IN CONTROLLER+++++======");
    if (response.data && response.data.results[0]) {
      const { lat, lon } = response.data.results[0];

      // getting super market using latitude and longitude
      const supermarkets = await getSuperMarketsHelper({
        lat,
        lon,
        radius,
        limit,
      });

      // sending back response
      const formatedResponse = formatResponse(supermarkets);
      return res.status(200).json(formatedResponse);
    }
    return res.status(400).json({ message: "Unknown postcode!" });
  } catch (error) {
    console.log("=== ERROR===", error.response.data);
    const { statusCode = 500, message = "Something went wrong!" } =
      error.response.data;
    return res.status(statusCode).json({ message });
  }
};

module.exports = {
  getNearBySuperMarkets,
};
