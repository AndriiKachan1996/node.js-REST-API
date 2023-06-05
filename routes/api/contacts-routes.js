const express = require("express");

const router = express.Router();

const {
	getAllContactsController,
	getContactByIdController,
	addContactController,
	updateContactController,
	removeContactController,
} = require("../../controllers/contacts-controller");

const schema = require("../../schemas/contacts-schema");

const { validateBody } = require("../../decorators");

router.get("/", getAllContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", validateBody(schema.addContactSchema), addContactController);

router.put(
	"/:contactId",
	validateBody(schema.addContactSchema),
	updateContactController
);

router.delete("/:id", removeContactController);

module.exports = router;
