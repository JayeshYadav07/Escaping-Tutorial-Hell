const Expense = require("../models/expenseModel");

const createExpense = async (req, res) => {
	try {
		const { title, amount, category } = req.body;
		const id = req.userId;

		if (!title || !amount || !category) {
			return res.send("Please enter title, amount and category");
		}

		const expense = await Expense.insertMany(
			{ title, amount, category, user: id },
			{
				new: true,
			}
		);
		res.send({ message: "Expense created", expense });
	} catch (error) {
		res.status(500).send(error.message || error);
	}
};

const getExpenses = async (req, res) => {
	try {
		const id = req.userId;

		const expenses = await Expense.find({ user: id });
		res.send({ expenses });
	} catch (error) {
		res.status(500).send(error.message || error);
	}
};

const updateExpense = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.userId;
		const { title, amount, category } = req.body;

		const expense = await Expense.findOneAndUpdate(
			{ _id: id, user: userId },
			{ title, amount, category },
			{ new: true }
		);

		res.send({ message: "Expense updated", expense });
	} catch (error) {
		res.status(500).send(error.message || error);
	}
};

const deleteExpense = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.userId;

		const expense = await Expense.findOneAndDelete({
			_id: id,
			user: userId,
		});

		res.send({ message: "Expense deleted", expense });
	} catch (error) {
		res.status(500).send(error.message || error);
	}
};

const getHistory = async (req, res) => {
	try {
		const start = req.query.start;
		const end = req.query.end;

		const expenses = await Expense.find({
			user: req.userId,
			date: { $gte: start, $lte: end },
		});

		res.send({ expenses });
	} catch (error) {
		res.status(500).send(error.message || error);
	}
};

module.exports = {
	createExpense,
	getExpenses,
	updateExpense,
	deleteExpense,
	getHistory,
};
