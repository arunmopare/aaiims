const jwt = require("jsonwebtoken");

const { logger } = require("../helpers/logger");
const UserModel = require("../models/user");

// middleware
exports.checkDuplicateEmail = async (req, res, next) => {
  const requestEmail = req.body.email;
  const password = req.body.password;

  if (password.length <= 5) {
    return res
      .status(400)
      .json({ error: "Error: password must be at lest 6 characters" });
  }

  try {
    const user = await UserModel.findOne({ email: requestEmail }).exec();
    logger("USER", user);
    if (user != null) {
      return res.status(400).json({ error: "Email Already Exists" });
    }
  } catch (error) {
    logger("ERROR in checkDuplicateEmail", error);
    return res.status(400).json({ error: "Something went wrong" });
  }
  next();
};

exports.signInWithEmailPassword = async (req, res) => {
  console.log("req.body", req.body);
  const email = req.body.email;
  console.log("email", email);
  const password = req.body.password;
  console.log("password", password);

  try {
    const user = await UserModel.findOne({ email: email }).exec();
    console.log("user", user);
    if (user == null) {
      return res.status(400).json({ msg: "Error: user not found" });
    }
    console.log("user.authenticate(password)", user.authenticate(password));

    if (!user.authenticate(password)) {
      return res.status(400).json({
        msg: "Error: NOT Authorized wrong password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.cookie("token", token, { expire: new Date() + 99 });
    return res.status(200).json({
      _id: user._id,
      token: token,
      expiresIn: "86400",
    });
  } catch (error) {
    logger("Error in SignInUSer", error);
    return res.status(400).json({ msg: "Error: Something went wrong." });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({ userType: "user" }).exec();
    if (users == null) {
      res.status(400).json({ error: "No Users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
exports.signUpWithEmailPassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  console.log("userType", userType);

  try {
    const user = UserModel({
      email: email,
      password: password,
      userType: userType,
    });

    const data = await user.save();
    console.log("data", data);
    const token = jwt.sign({ _id: data._id }, process.env.SECRET, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      msg: "Sign Up Successful",
      idToken: user._id,
      refreshToken: token,
      expiresIn: "86400",
    });
  } catch (error) {
    logger(error);
    return res.status(400).json({ error: error.toString() });
  }

  // return res.status(200).json({ msg: "user registered" });
};
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  UserModel.deleteOne({ _id: userId })
    .then((data) => {
      console.log("data", data);
      if (data.deletedCount >= 1) {
        return res.status(200).json({ msg: "User Deleted" });
      } else {
        return res.status(400).json({ msg: "User Not Deleted" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ msg: "User Not Deleted" });
    });
};
