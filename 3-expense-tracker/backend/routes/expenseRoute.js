const express = require("express");
const {
	getExpenses,
	createExpense,
	updateExpense,
	deleteExpense,
	getHistory,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/", getExpenses);

router.post("/", createExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

router.get("/history", getHistory);

module.exports = router;
