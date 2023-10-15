"use strict";
const { Router } = require("express");
const { hashPassword } = require("../utils/auth.utils");
const userModel = require("../models/user.model");

const authRouter = Router();

authRouter.get("/login", (req, res) => {
	res.render("login");
});

authRouter.get("/register", (req, res) => {
	res.render("register");
});

authRouter.post("/register", async (req, res) => {
	try {
		let { password, username, fullName } = req.body;
		password = hashPassword(password);
		let user = await userModel.create({
			fullName,
			username,
			password,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = authRouter;
