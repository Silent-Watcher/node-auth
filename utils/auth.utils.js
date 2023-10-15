"use strict";
const bcrypt = require("bcrypt");

const hashPassword = (pass) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(pass, salt);
	return hash;
};

module.exports = {
	hashPassword
}