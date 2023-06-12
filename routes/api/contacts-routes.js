const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contacts-controller");

const schema = require("../../schemas/contacts-schema");

const { validateBody } = require("../../decorators");

const { isValidId } = require("..//..//middlewares");

////////////////////////////////////////////////////////////////////////

router.get("/", controllers.getAllContactsController);

router.get("/:contactId", isValidId, controllers.getContactByIdController);

router.post(
	"/",
	validateBody(schema.addContactSchema),
	controllers.addContactController
);

router.put(
	"/:contactId",
	isValidId,
	validateBody(schema.addContactSchema),
	controllers.updateContactController
);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateBody(schema.updateContactSchema),
	controllers.updateFavoriteController
);

router.delete("/:contactId", isValidId, controllers.removeContactController);

//////////////////////////////////////////////////////////////////////////

module.exports = router;
