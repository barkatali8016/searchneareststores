const dotEnv = require("dotenv");
console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
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
