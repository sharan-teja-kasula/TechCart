const express = require("express");

const cors = require("cors");

const compression = require("compression");

const rateLimit = require("express-rate-limit");

// routes
const productRoutes = require("../src/routes/product");

const requestValidator = require("./routes.validator");

const { BASE_SECURITY_URL } = require("../src/constants");

const configApplication = (app) => {
  const corsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));

  app.use(compression());

  app.use(express.text({ limit: "5mb", extended: false }));

  app.use(express.json({ limit: "5mb", extended: false }));

  app.use(express.urlencoded({ limit: "5mb", extended: false }));

  app.use(rateLimit({ windowMs: 60 * 60 * 1000, max: 10000 }));

  //routes
  app.use((req, res, next) => requestValidator(req, res, next));

  app.use(BASE_SECURITY_URL + "/product", productRoutes);
};

module.exports = configApplication;
