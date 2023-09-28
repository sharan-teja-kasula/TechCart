require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);

    console.log(`Mongo Connection  -->  SUCCESS`);
  } catch (err) {
    console.log(`Mongo Connection  -->  FAILED`);
    throw err;
  }
};

module.exports = dbConnect;
