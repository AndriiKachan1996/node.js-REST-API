const contactsService = require("../models/contacts");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../decorators");

const getAllContactsController = async (req, res) => {
	const result = await contactsService.listContacts();
	res.json(result);
};

const getContactByIdController = async (req, res) => {
	const { contactId } = req.params;
	const result = await contactsService.getContactById(contactId);
	if (!result) {
		throw HttpError(404, `Contact with id ${contactId} is not found`);
	}
	res.json(result);
};

const addContactController = async (req, res) => {
	// const { error } = addContactSchema.validate(req.body);
	// if (error) {
	// 	throw HttpError(400, error.message);
	// }
	const result = await contactsService.addContact(req.body);
	res.status(201).json(result);
};

const updateContactController = async (req, res) => {
	// const { error } = addContactSchema.validate(req.body);

	// if (error) {
	// 	throw HttpError(400, error.message);
	// }

	const { contactId } = req.params;
	const result = await contactsService.updateContact(contactId, req.body);

	if (!result) {
		throw HttpError(404, `Contact with id ${contactId} is not found`);
	}

	res.json(result);
};

const removeContactController = async (req, res) => {
	const { id } = req.params;
	const result = await contactsService.removeContact(id);
	if (!result) {
		return res
			.status(404)
			.json({ message: `Contact with id ${id} is not found` });
	}

	res.status(200).json({ message: "contact deleted" });
};
module.exports = {
	getAllContactsController: controllerWrapper(getAllContactsController),
	getContactByIdController: controllerWrapper(getContactByIdController),
	addContactController: controllerWrapper(addContactController),
	updateContactController: controllerWrapper(updateContactController),
	removeContactController: controllerWrapper(removeContactController),
};
