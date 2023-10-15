const dotenv = require("dotenv");
const path = require("path");
const { env } = require("node:process");

dotenv.config();

const ENV_PATH = path.resolve(
	path.join(__dirname, "..", `.env.${env.APP_ENV}`)
);

dotenv.config({
	path: ENV_PATH,
});

