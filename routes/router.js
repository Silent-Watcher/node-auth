"use strict";
const { Router } = require("express");
const authRouter = require("./auth.routes");
const { checkAuth } = require("../middlewares/checkAuth.middleware");

const router = Router();

function runRouter(passport) {
	router.use("/auth", authRouter);

	router.get("/", (req, res, next) => {
		try {
			res.render("index");
		} catch (error) {
			next(error);
		}
	});

	router.get("/profile", checkAuth ,(req, res) => {
		const user = req.user;
		res.render("profile", {
			user,
		});
	});

	return router;
}

module.exports = runRouter;
