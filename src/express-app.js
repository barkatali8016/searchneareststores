const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

/***
 * expressApp Function
 * @param app
 */
module.exports = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  // forwading to routes
  app.use("/api", routes);
};
