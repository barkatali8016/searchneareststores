const axios = require("axios");
const { GEOAPIFYKEY } = require("../../config/config");

/**
 * getting config for postcode api
 * @param {*} postcode
 * @param {*} apikey
 * @returns config
 */
const getConfig = (postcode, apikey) => {
  const encPostcode = encodeURIComponent(postcode);
  return {
    method: "get",
    url: `https://api.geoapify.com/v1/geocode/search?postcode=${encPostcode}&format=json&apiKey=${apikey}`,
    headers: {},
  };
};

/**
 * calling open api to get latitude and longitude
 * @param {*} postcode
 * @returns Promise
 */
const getLatLongByPostCode = (postcode) => {
  const config = getConfig(postcode, GEOAPIFYKEY);
  return axios(config);
};

/**
 * generate config for super markets
 * @param {*} lat,lon, GEOAPIFYKEY: apikey, radius, limit,
 * @returns config
 */
const getSuperMarketConfig = ({
  lat,
  lon,
  GEOAPIFYKEY: apikey,
  radius,
  limit,
}) => {
  return {
    method: "get",
    url: `https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=${limit}&apiKey=${apikey}`,
  };
};

/**
 * Getting Super Markets By Lat and Long
 * @param {*} lat, lon, radius, limit
 * @returns Promise
 */
const getSuperMarketsByLatLong = ({ lat, lon, radius, limit }) => {
  const config = getSuperMarketConfig({ lat, lon, GEOAPIFYKEY, radius, limit });
  return axios(config);
};
module.exports = {
  getLatLongByPostCode,
  getSuperMarketsByLatLong,
};
