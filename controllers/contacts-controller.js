const fs = require("fs/promises");

// const path = require("path");

// const avatarsDir = path.resolve("public", "avatars");

const Contact = require("../models/contact");

const { HttpError, cloudinary } = require("../helpers");

const { controllerWrapper } = require("../decorators");

////////////////////////////////////////////////////////////////////////

const getAllContactsController = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, ...query } = req.query;
	const skip = (page - 1) * limit;
	const result = await Contact.find(
		{ owner, ...query },
		"-createdAt, -updateAt",
		{
			skip,
			limit,
		}
	).populate("owner", "name email");
	res.json(result);
};

const getContactByIdController = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findById(contactId);
	if (!result) {
		throw HttpError(404, `Contact with id ${contactId} is not found`);
	}
	res.json(result);
};

const addContactController = async (req, res) => {
	const { _id: owner } = req.user;
	const { path: oldPath } = req.file;
	const fileData = await cloudinary.uploader.upload(oldPath, {
		folder: "posters",
	});
	await fs.unlink(oldPath);
	const result = await Movie.create({
		...req.body,
		poster: fileData.url,
		owner,
	});
	res.status(201).json(result);
	// await fs.unlink(oldPath);
	// const result = await Movie.create({
	// 	...req.body,
	// 	poster: fileData.url,
	// 	owner,
	// });
	// res.status(201).json(result);
	// const { _id: owner } = req.user;
	// const { path: oldPath } = req.file; // Отримуємо шлях та ім'я файлу з запиту (req.file)
	// const fileData = await cloudinary.uploader.upload(oldPath, {
	// 	folder: "posters",
	// });
	// console.log(fileData);

	// const poster = path.join("avatars", filename); // Формуємо шлях для використання у відповіді клієнту

	// const result = await Contact.create({ ...req.body, poster, owner }); // Створюємо новий контакт у базі даних, використовуючи дані з тіла запиту (req.body), шляху до файлу та ідентифікатора власника

	// res.status(201).json(result);
};

const updateContactController = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});

	if (!result) {
		throw HttpError(404, `Contact with id ${contactId} is not found`);
	}

	res.json(result);
};

const updateFavoriteController = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	console.log(result);

	if (!result) {
		throw HttpError(404, `Contact with id ${contactId} is not found`);
	}

	res.json(result);
};

const removeContactController = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndRemove(contactId);
	if (!result) {
		return res
			.status(404)
			.json({ message: `Contact with id ${contactId} is not found` });
	}

	res.status(200).json({ message: "contact deleted" });
};

///////////////////////////////////////////////////////////////////////

module.exports = {
	getAllContactsController: controllerWrapper(getAllContactsController),
	getContactByIdController: controllerWrapper(getContactByIdController),
	addContactController: controllerWrapper(addContactController),
	updateContactController: controllerWrapper(updateContactController),
	updateFavoriteController: controllerWrapper(updateFavoriteController),
	removeContactController: controllerWrapper(removeContactController),
};
