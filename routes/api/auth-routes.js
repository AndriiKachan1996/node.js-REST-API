const express = require("express");

const router = express.Router();

const { validateBody } = require("../../decorators");

const schema = require("../../schemas/users-joiSchema");

const authController = require("../../controllers/auth-controller");

const { authenticate } = require("../../middlewares");

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

//////////////////////////////////////////////////////////////////////////
module.exports = router;
