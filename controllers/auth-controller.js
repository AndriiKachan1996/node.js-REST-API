const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
///////////////////////////////////////////////////////////////

const { SECRET_KEY } = process.env;

const User = require("../models/user");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../decorators");

///////////////////////////////////////////////////////////////

const singUp = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, `Email ${user.email} is already in use`);
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({ ...req.body, password: hashPassword });

	res.status(201).json({
		name: newUser.name,
		email: newUser.email,
	});
};

const singIn = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401);
	}

	const passCompare = await bcrypt.compare(password, user.password);

	if (!passCompare) {
		throw HttpError(401);
	}

	const { _id: id } = user;

	const payload = {
		id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(id, { token });

	res.json({
		token,
	});
};

const getCurrent = async (req, res) => {
	const { name, email } = req.user;
	res.json({
		name,
		email,
	});
};

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.json({
		message: "Logout success",
	});
};

//////////////////////////////////////////////////////////////////////////
module.exports = {
	singUp: controllerWrapper(singUp),
	singIn: controllerWrapper(singIn),
	getCurrent: controllerWrapper(getCurrent),
	logout: controllerWrapper(logout),
};
