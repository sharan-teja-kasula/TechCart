const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  { strict: false, timestamps: true },
  { collection: "user" }
);

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("user", userSchema);
module.exports = User;
