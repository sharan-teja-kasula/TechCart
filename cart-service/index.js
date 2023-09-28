require("dotenv").config();

const http = require("http");
const express = require("express");

const configApplication = require("./config/express");
const dbConnect = require("./config/database");

const startApplication = async () => {
  try {
    await dbConnect();

    const app = express();
    configApplication(app);

    const server = http.createServer(app);
    const port = Number(process.env.PORT || 3000);

    server.listen(port);
    server.on("listening", () => {
      console.log("Server Running on Port  -->  " + port);
    });
  } catch (err) {
    console.log(err);
  }
};

startApplication();
