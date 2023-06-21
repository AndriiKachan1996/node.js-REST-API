require("dotenv").config();
//
const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();
//
const contactsRouter = require("./routes/api/contacts-routes");
const authRouter = require("./routes/api/auth-routes");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
//

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server Error" } = err;
	res.status(status).json({ message });
});

module.exports = app;
// //////////////////////////////////////////////////////////////////

//const decodeToken = jwt.decode(token);

// try {
// 	const { id } = jwt.verify(token, SECRET_KEY);
// 	console.log(id);
// } catch (error) {
// 	console.log(error.message);
// }
