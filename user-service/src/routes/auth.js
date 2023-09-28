const express = require("express");
const validator = require("validator");

const router = express.Router();

const userController = require("../controllers/user");

const jwt = require("../services/jwt");
const { logError } = require("../services/logger");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || !validator.isEmail(email))
      return res.status(422).send({ msg: "Invalid email!" });

    if (typeof password !== "string" || password?.length < 8)
      return res.status(422).send({ msg: "Password minimum length is 8!" });

    const user = await userController.verifyUser(email, password);
    if (!user)
      return res.status(422).send({ msg: "Incorrect email or password!" });

    const token = jwt.generateToken(user);

    res.status(200).send({ user, token });
  } catch (err) {
    delete req.body?.password;

    logError("auth.js", "/login", "POST", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { displayName, email, password } = req.body;

    if (typeof displayName !== "string" || displayName?.length < 1)
      return res.status(422).send({ msg: "Name minimum length is 2!" });

    if (typeof email !== "string" || !validator.isEmail(email))
      return res.status(422).send({ msg: "Invalid email!" });

    if (typeof password !== "string" || password?.length < 8)
      return res.status(422).send({ msg: "Password minimum length is 8!" });

    const isEmailRegistered = await userController.verifyEmail(email);
    if (isEmailRegistered)
      return res.status(422).send({ msg: "Email already registered!" });

    const user = { displayName, email, password };

    await userController.save(user);

    res.status(200).send({ msg: "Successfully registered!" });
  } catch (err) {
    delete req.body?.password;

    logError("auth.js", "/register", "POST", req, err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

module.exports = router;
