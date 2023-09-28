const bcrypt = require("bcrypt");

const User = require("../models/User");

const { BYCRYPT } = require("../constants");

const that = {};

that.verifyEmail = async (email) => {
  try {
    const filter = { email };
    const user = await User.findOne(filter);

    return user ? true : false;
  } catch (err) {
    throw err;
  }
};

that.save = async (user) => {
  try {
    let { displayName, email, password } = user;

    password = await bcrypt.hash(password, BYCRYPT.SALT_ROUNDS);

    const newUser = User({
      displayName,
      email,
      password,
      isAdmin: false,
    });

    await newUser.save();
  } catch (err) {
    throw err;
  }
};

that.verifyUser = async (email, password) => {
  try {
    const filter = { email };
    const project = {
      email: 1,
      password: 1,
      displayName: 1,
      isAdmin: 1,
    };

    let user = await User.findOne(filter).select(project);
    if (!user) return false;

    user = user.toObject();

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return false;

    delete user.password;

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = that;
