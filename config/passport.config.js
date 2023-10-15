const { Strategy: LocalStrategy } = require("passport-local");
const userModel = require("../models/user.model");
const { compareSync } = require("bcrypt");

function passportInit(passport) {
	const verify = async (username, password, done) => {
		try {
			const user = await userModel.findOne({ username });
			if (!user) return done(null, false, { message: "user not found" });
			if (compareSync(password, user.password)) return done(null, user);
			return done(null, false, { message: "password is incorrect" });
		} catch (error) {
			done(error);
		}
	};
	const localStrategy = new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		verify
	);
	const serializeUser = passport.serializeUser((user, done) => {
		return done(null, user.id);
	});
	const deserializeUser = passport.deserializeUser(async (id, done) => {
		const user = await userModel.findById(id);
		if (!user) return done(null, false, { message: "user not found" });
		return done(null, user);
	});
	passport.use("local", localStrategy, serializeUser, deserializeUser);
}

module.exports = {passportInit};