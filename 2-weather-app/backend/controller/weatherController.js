const client = require("../redis");
const axios = require("axios");
require("dotenv").config();

const getWeather = async (req, res) => {
	try {
		const place = req.params.place;
		const URL = `${process.env.WEATHER_API}${place}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;

		const result = await axios.get(URL);
		const { address, description } = result.data;
		const { conditions, temp } = result.data.currentConditions;

		res.status(200).send({ address, conditions, temp, description });
	} catch (err) {
		res.status(500).send({
			msg: "Error while fetching weather",
			error: err,
		});
	}
};

module.exports = {
	getWeather,
};
