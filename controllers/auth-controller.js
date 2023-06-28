const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const gravatar = require("gravatar");

const path = require("path");
// const { usersService } = require('../../service');

const fs = require("fs").promises;
const Jimp = require("jimp");
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

	const avatarURL = gravatar.url(User.email);

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
	});

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

////////////////////////////////////////////////////////////////

const setAvatar = async (req, res) => {
	// const avatarsDir = path.join(process.cwd(), "public", "avatars");
	// const { _id } = req.user;
	// const { path: tempUpload, originalname } = req.file;
	// const uniqueFilename = `${_id}_${Date.now()}_${originalname}`;
	// const resizedAvatarPath = path.join(avatarsDir, uniqueFilename);
	// const avatarURL = path.join("avatars", uniqueFilename);

	// try {
	// 	await Jimp.read(tempUpload)
	// 		.then((avatarImage) => {
	// 			return avatarImage.resize(250, 250).write(resizedAvatarPath);
	// 		})
	// 		.catch((error) => {
	// 			throw new Error(error.message);
	// 		});

	// 	await fs.unlink(tempUpload); // Видалення тимчасового файлу з папки tmp

	// 	await User.findByIdAndUpdate(_id, { avatarURL });

	// 	res.json({
	// 		avatarURL,
	// 	});
	// } catch (error) {
	// 	console.log(error.message);
	// 	res.status(500).json({ message: "Server Error" });
	// }
	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;

	const avatarsDir = path.join(process.cwd(), "public", "avatars");

	const resizedAvatar = Jimp.read(tempUpload)
		.then((avatarImage) => {
			return avatarImage.resize(250, 250).write(avatarURL);
		})
		.catch((error) => {
			console.log(error.message);
		});
	const filename = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarsDir, filename);
	await fs.rename(tempUpload, resultUpload);
	const avatarURL = path.join("avatars", filename);
	await User.findByIdAndUpdate(_id, { resizedAvatar });

	res.json({
		avatarURL,
	});
};

////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
module.exports = {
	singUp: controllerWrapper(singUp),
	singIn: controllerWrapper(singIn),
	getCurrent: controllerWrapper(getCurrent),
	logout: controllerWrapper(logout),
	setAvatar: controllerWrapper(setAvatar),
};
