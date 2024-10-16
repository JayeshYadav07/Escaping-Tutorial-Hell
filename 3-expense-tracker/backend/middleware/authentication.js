const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).send("Unauthorized request");
	}

	const token = req.headers.authorization.split(" ")[1];
	if (token === "null") {
		return res.status(401).send("Unauthorized request");
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = payload.userId;
		next();
	} catch (error) {
		return res.status(401).send(error.message || error);
	}
};

module.exports = auth;
