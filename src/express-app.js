const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const swaggerDocument = require(path.resolve(
  __dirname,
  "./open-api-swagger.json"
));

/***
 * expressApp Function
 * @param app
 */
module.exports = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // forwading to routes
  app.use("/api", routes);
};
