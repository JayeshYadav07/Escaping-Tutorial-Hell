const jwtSecret = "JWT_SECRET";
const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
	const token = req.cookies.token;
	if (token) {
		const user = await jwt.verify(token, jwtSecret);
		if (user) {
			req.userId = user.userId;
			next();
		} else {
			res.status(401).json({ error: "Unauthorized" });
		}
	} else {
		res.status(401).json({ error: "Unauthorized" });
	}
};

module.exports = authentication;
