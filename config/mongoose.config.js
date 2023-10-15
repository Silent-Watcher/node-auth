const mongoose = require("mongoose");

const DB_NAME = "auth";
const DB_URL = `mongodb://127.0.0.1:27017/${DB_NAME}`;

mongoose.set("strictQuery", true);

const connectToMongoDb = async (dbUrl) => await mongoose.connect(dbUrl);
connectToMongoDb(DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "failed to connect to mongoDb"));
