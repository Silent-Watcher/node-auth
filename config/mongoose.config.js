const mongoose = require("mongoose");
const { env } = require("node:process");

const DB_URL = `${env.DB_URL}/${env.DB_NAME}`;

mongoose.set("strictQuery", true);

const connectToMongoDb = async (dbUrl) => await mongoose.connect(dbUrl);
connectToMongoDb(DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "failed to connect to mongoDb"));
