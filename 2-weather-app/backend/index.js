const express = require("express");
const app = express();
const wetherRoute = require("./routes/weatherRoute");

app.use(express.json());
app.use("/weather", wetherRoute);

app.listen(8000, () => {
	console.log("Server started on port 8000");
});
