const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contacts-controller");

const schema = require("../../schemas/contacts-joiSchema");

const { validateBody } = require("../../decorators");

const { isValidId, authenticate, upload } = require("..//..//middlewares");

////////////////////////////////////////////////////////////////////////

router.use(authenticate);

router.get("/", controllers.getAllContactsController);

router.get("/:contactId", isValidId, controllers.getContactByIdController);

router.post(
	"/",
	upload.single("poster"),
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
