const db = require("../db");
const jwt = require("jsonwebtoken");
const jwtSecret = "JWT_SECRET";

const userSignup = async (req, res) => {
	const { username, password } = req.body;
	try {
		const isUser = await db.query(
			"SELECT * FROM users WHERE username = $1",
			[username]
		);

		if (isUser.rows.length > 0) {
			return res.status(409).json({ error: "User already exists" });
		}

		const newUser = await db.query(
			"INSERT INTO users (username,password) VALUES ($1, $2) RETURNING *",
			[username, password]
		);
		const token = jwt.sign({ userId: newUser.rows[0].id }, jwtSecret);
		res.cookie("token", token);

		res.status(201).json({
			message: "Registration successful",
			data: newUser.rows[0],
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const userLogin = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await db.query("SELECT * FROM users WHERE username = $1", [
			username,
		]);
		if (user.rows.length === 0) {
			return res.status(401).json({ error: "Invalid username" });
		}
		const validPassword = await db.query(
			"SELECT * FROM users WHERE username = $1 AND password = $2",
			[username, password]
		);
		if (validPassword.rows.length === 0) {
			return res
				.status(401)
				.json({ error: "Invalid username or password" });
		}

		const token = jwt.sign({ userId: user.rows[0].id }, jwtSecret);
		res.cookie("token", token);

		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { userLogin, userSignup };
