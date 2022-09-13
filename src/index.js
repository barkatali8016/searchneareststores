const express = require("express");
const { PORT } = require("../config/config");
const expressApp = require("./express-app");
/**
 * creating and starting the express server
 */
const startServer = async () => {
  const app = express();

  // passing app to expressApp
  expressApp(app);

  //Server is listening on PORT
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  });
};
// calling startServer
startServer();
