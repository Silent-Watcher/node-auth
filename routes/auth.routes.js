'use strict';
const { Router } = require("express");

const authRouter = Router();

authRouter.get("/login", (req, res) => {
	res.render("login");
});
authRouter.get("/register", (req, res) => {
	res.render("register");
});

module.exports = authRouter;
