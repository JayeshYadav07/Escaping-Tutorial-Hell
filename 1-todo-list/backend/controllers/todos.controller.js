const pool = require("../db");

// Add a new todo
const addTodo = async (req, res) => {
	const userId = req.userId;
	const { title } = req.body;
	try {
		const newTodo = await pool.query(
			"INSERT INTO todos (title,created_by) VALUES ($1,$2) RETURNING *",
			[title, userId]
		);
		res.json({
			msg: "Todo added",
			Data: newTodo.rows[0],
		});
	} catch (err) {
		res.json(err.message);
	}
};

// Get all todos
const getAllTodos = async (req, res) => {
	const userId = req.userId;
	try {
		const allTodos = await pool.query(
			"SELECT * FROM todos WHERE created_by = $1",
			[userId]
		);
		res.json(allTodos.rows);
	} catch (err) {
		res.json(err.message);
	}
};

// Get a todo by ID
const getTodo = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	try {
		const todo = await pool.query(
			"SELECT * FROM todos WHERE created_by = $1 AND id = $2",
			[userId, id]
		);
		if (todo.rows.length === 0) {
			res.status(404).json({ msg: "Todo not found" });
		} else {
			res.json(todo.rows[0]);
		}
	} catch (err) {
		res.json(err.message);
	}
};

// Update a todo
const updateTodo = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	const { title, completed } = req.body;
	try {
		const updateTodo = await pool.query(
			"UPDATE todos SET title = $1, completed = $2 WHERE created_by = $3 AND id = $4",
			[title, completed, userId, id]
		);
		res.json("Todo was updated!");
	} catch (err) {
		res.json(err.message);
	}
};

// Delete a todo
const deleteTodo = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	try {
		const deleteTodo = await pool.query(
			"DELETE FROM todos WHERE created_by = $1 AND id = $2",
			[userId, id]
		);
		res.json("Todo was deleted!");
	} catch (err) {
		res.json(err.message);
	}
};

module.exports = {
	addTodo,
	getAllTodos,
	getTodo,
	updateTodo,
	deleteTodo,
};
