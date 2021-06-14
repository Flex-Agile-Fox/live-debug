const express = require("express");

const app = express();

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use("/", routes);
app.use(errorHandler);

app.listen(3000, () => {
	console.log(`Application run in port 3000`);
});

module.exports = app;
