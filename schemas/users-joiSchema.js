const Joi = require("joi");

const { emailRegexp } = require("../constans/users");

////////////////////////////////////////////////////////////////

const addUserSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const addUserLoginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

////////////////////////////////////////////////////////////////

module.exports = {
	addUserSchema,
	addUserLoginSchema,
};
