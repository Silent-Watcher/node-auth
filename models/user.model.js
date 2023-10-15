const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	fullName: { type: String, required: true, minLength: 5 },
	password: { type: String, required: true, minLength: 8 },
	username: { type: String, required: true, unique: true },
});

const userModel = model("user", userSchema);

module.exports = userModel;