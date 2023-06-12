const Contact = require("../models/contact");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../decorators");

////////////////////////////////////////////////////////////////////////

const getAllContactsController = async (req, res) => {
	const result = await Contact.find({});
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
	const result = await Contact.create(req.body);
	res.status(201).json(result);
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
