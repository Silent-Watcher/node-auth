"use strict";

const notFoundErrorHandler = (req, res, next) => {
	return res.status(404).render("404");
};

module.exports = notFoundErrorHandler;
