const express = require("express");

const router = express.Router();

const { validateBody } = require("../../decorators");

const schema = require("../../schemas/users-joiSchema");

const authController = require("../../controllers/auth-controller");

const { authenticate, upload } = require("../../middlewares");

//////////////////////////////////////////////////////////////////////////

router.post(
	"/singup",
	validateBody(schema.addUserSchema),
	authController.singUp
);

router.post(
	"/singin",
	validateBody(schema.addUserLoginSchema),
	authController.singIn
);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
	"/avatars",
	authenticate,
	upload.single("avatar"),
	authController.setAvatar
);

//////////////////////////////////////////////////////////////////////////
module.exports = router;
