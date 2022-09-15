const swaggerAutogen = require("swagger-autogen")();

const path = require("path");

const outputFile = path.resolve(__dirname, "./open-api-swagger.json");
const endpointsFiles = [path.resolve(__dirname, "./routes/routes.js")];

swaggerAutogen(outputFile, endpointsFiles);
