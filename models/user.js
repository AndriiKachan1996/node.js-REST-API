const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const { emailRegexp } = require("../constans/users");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
		},
	},

	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
