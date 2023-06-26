const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const contactsSchema = new Schema({
	name: {
		type: String,
		required: [true, "Set name for contact"],
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
	poster: {
		type: String,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
});

contactsSchema.post("save", handleMongooseError);

const Model = model("contact", contactsSchema);

module.exports = Model;

// name:
// "Allen Raymond"
// email:
// "nulla.ante@vestibul.co.uk"
// phone:
// "(992) 914-3792"
// favorite:
// false
