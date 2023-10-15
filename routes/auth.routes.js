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

authRouter.post("/register", async (req, res, next) => {
	try {
		let { password, username, fullname: fullName } = req.body;
		let user = await userModel.findOne({ username });
		if (user) {
			let referrer = req.headers.referer;
			req.flash("error", "this username is already exists");
			return res.redirect(referrer);
		}
		password = hashPassword(password);
		let newUser = await userModel.create({
			fullName,
			username,
			password,
		});
		res.redirect("/auth/login");
	} catch (error) {
		next(error);
	}
});

module.exports = authRouter;
