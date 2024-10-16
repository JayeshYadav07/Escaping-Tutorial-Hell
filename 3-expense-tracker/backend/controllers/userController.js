const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();
const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.send("Please enter name, email and password");
		}

		// check if user already exists
		const isUserPresent = await User.findOne({ email });
		if (isUserPresent) {
			return res.send("User already present");
		}

		// create new user
		const user = await User.insertMany(
			{ name, email, password },
			{
				new: true,
			}
		);
		res.status(201).send({ message: "Signup successful", user });
	} catch (error) {
		res.status(500).send(error.message || error);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.send("Please enter email and password");
		}

		const user = await User.findOne({ email, password });
		if (!user) {
			return res.send("Email or password is incorrect");
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.status(200).send({ message: "Login successful", user, token });
	} catch (error) {
		res.status(500).send(error.message || error);
	}
};

module.exports = {
	login,
	signup,
};
