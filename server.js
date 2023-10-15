const express = require("express");
const { env } = require("node:process");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require("node:path");

require("./config/env.config");

const app = express();
const PORT = env.PORT;
const LAYOUT_PATH = path.join(__dirname, "views", "layouts", "main.ejs");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);

app.set("view engine", "ejs");
app.set("layout", LAYOUT_PATH);

app.get("/", (req, res) => {
	res.render("index");
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
