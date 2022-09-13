const dotEnv = require("dotenv");
if (process.env.NODE_ENV !== "prod") {
  const configFile = `.env.${process.env.NODE_ENV.trim()}`;

  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  GEOAPIFYKEY: process.env.GEOAPIFYKEY,
  APP_SECRET: process.env.APP_SECRET,
};
