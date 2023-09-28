const express = require("express");

const cors = require("cors");

const compression = require("compression");

const rateLimit = require("express-rate-limit");

const authRoutes = require("../src/routes/auth");

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

  app.use("/auth", authRoutes);
};

module.exports = configApplication;
