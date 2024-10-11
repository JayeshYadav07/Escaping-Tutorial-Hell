const express = require("express");
const { getWeather } = require("../controller/weatherController");

const router = express.Router();

router.get("/:place", getWeather);

module.exports = router;
