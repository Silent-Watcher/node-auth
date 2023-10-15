const { Router } = require("express");
const authRouter = require("./auth.routes");

const router = Router();

router.use("/auth", authRouter);

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/profile", (req, res) => {
	res.render("profile", {
		user: {
			_id: "",
			fullName: "",
			password: "",
			username: "",
		},
	});
});

module.exports = router;
