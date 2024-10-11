const client = require("../redis"); // Ensure this is your Redis connection instance
const axios = require("axios");
require("dotenv").config();

const getWeather = async (req, res) => {
	try {
		const place = req.params.place;
		const URL = `${process.env.WEATHER_API}${place}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;

		// Check Redis cache first
		const cachedData = await client.get(place);
		if (cachedData) {
			console.log("Fetching from cache");
			return res.status(200).send({ data: JSON.parse(cachedData) });
		}

		// If no cache, make an API request
		const result = await axios.get(URL);

		// Extract data from API response
		const { address, description } = result.data;
		const { conditions, temp } = result.data.currentConditions;
		const data = { address, conditions, temp, description };

		// Store the API result in Redis with a TTL (1 hour = 3600 seconds)
		await client.set(place, JSON.stringify(data), { EX: 3600 });

		console.log("Fetching from API");
		res.status(200).json({ data: data });
	} catch (err) {
		// Handle errors (API or Redis)
		console.error("Error fetching weather data:", err);
		res.status(500).send({
			msg: "Error while fetching weather data",
			error: err.message || err,
		});
	}
};

module.exports = {
	getWeather,
};
