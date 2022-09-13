const express = require("express");
const router = express.Router();
const { getNearBySuperMarkets } = require("../controllers/controller");

/***
 * Routes for geting near by super makets
 */
router.get("/near-by-supermarkets/:postcode", getNearBySuperMarkets);
module.exports = router;
