const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const auth = require("./middleware/authentication");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.use("/api/users", userRoute);
app.use("/api/expenses", auth, expenseRoute);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});
