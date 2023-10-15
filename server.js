"use strict";
const express = require("express");
const { env } = require("node:process");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require("node:path");
const flash = require("express-flash");
const session = require("express-session");

const router = require("./routes/router");
const notFoundErrorHandler = require("./middlewares/global/notFoundErrorHandler.middleware");
const errorHandler = require("./middlewares/global/errorHandler.middleware");

require("./config/env.config");
require("./config/mongoose.config");

const app = express();
const PORT = env.PORT;
const LAYOUT_PATH = path.join(__dirname, "views", "layouts", "main.ejs");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);
app.use((req, res, next) => {
	res.locals = {
		title: "auth",
	};
	next();
});

app.use(flash());
app.use(
	session({
		secret: "a secret",
		saveUninitialized: false,
		resave: false,
	})
);

app.set("view engine", "ejs");
app.set("layout", LAYOUT_PATH);

app.use(router);

app.use(notFoundErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
