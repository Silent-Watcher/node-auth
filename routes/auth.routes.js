"use strict";
const { Router } = require("express");
const { hashPassword } = require("../utils/auth.utils");
const userModel = require("../models/user.model");
const {
	redirectAuthenticated,
	checkAuth,
} = require("../middlewares/checkAuth.middleware");
const passport = require("passport");

const authRouter = Router();

authRouter.get("/login", redirectAuthenticated, (req, res) => {
	res.render("login");
});

authRouter.get("/register", redirectAuthenticated, (req, res) => {
	res.render("register");
});

authRouter.post("/register", redirectAuthenticated, async (req, res, next) => {
	try {
		let { password, username, fullname: fullName } = req.body;
		let user = await userModel.findOne({ username });
		if (user) {
			let referrer = req.headers.referer;
			req.flash("error", "this username is already exists");
			return res.redirect(referrer);
		}
		let newUser = await userModel.create({
			fullName,
			username,
			password: hashPassword(password),
		});
		res.redirect("/auth/login");
	} catch (error) {
		next(error);
	}
});

authRouter.post(
	"/login",
	redirectAuthenticated,
	passport.authenticate("local", {
		successRedirect: "/profile",
		failureRedirect: "/login",
		failureFlash: true,
	}),
	async (req, res, next) => {
		res.redirect("/profile");
	}
);

authRouter.get("/logout", checkAuth, (req, res) => {
	req.logOut({ keepSessionInfo: false }, (error) => {
		if (error) throw new Error(error);
	});
	res.redirect("/");
});

module.exports = authRouter;
