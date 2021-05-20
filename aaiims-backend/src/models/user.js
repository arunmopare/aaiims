const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { logger } = require("../helpers/logger");

const userScheme = new mongoose.Schema({
  // userId: {
  //   type: String,
  // },
  email: {
    type: String,
  },
  userType: {
    type: String,
  },
  salt: String,
  encrypted_password: {
    type: String,
  },
});

userScheme.pre("save", function (next) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      this.email
    )
  ) {
    next();
  }

  const err = new Error("You have entered an invalid email address!");
  next(err);
});

userScheme
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encrypted_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userScheme.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encrypted_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userScheme);
