"use strict";

const checkAuth = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	return res.redirect("/auth/login");
};

const redirectAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) return res.redirect("/profile");
	return next();
};

module.exports = {
	checkAuth,
	redirectAuthenticated,
};
