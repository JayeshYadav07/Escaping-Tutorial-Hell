// db.js

const { Pool } = require("pg");

// Set up the PostgreSQL connection
const pool = new Pool({
	user: "postgres", // PostgreSQL username
	host: "localhost", // PostgreSQL host
	database: "postgres", // Database name
	password: "todo", // PostgreSQL password
	port: 5432, // PostgreSQL port (default is 5432)
});

module.exports = pool;
