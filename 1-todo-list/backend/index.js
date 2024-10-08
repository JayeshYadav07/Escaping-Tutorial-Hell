const express = require("express");
const cookieParser = require("cookie-parser");
const todos = require("./routes/todos.routes");
const users = require("./routes/users.routes");
const authentication = require("./middleware/authentication");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/todos", authentication, todos);
app.use("/users", users);

// Start the server
app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
