const jwt = require("jsonwebtoken");
const { logger } = require("../src/helpers/logger");

exports.isAuthenticated = async (req, res, next) => {
  // const userId = req.params.userId;

  // logger("USERID", userId);
  // logger("isAuthenticated");
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: "Unauthorized Request",
    });
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).json({
      error: "Unauthorized Request",
    });
  }
  try {
    let payload = jwt.verify(token, process.env.SECRET);
    if (!payload) {
      return res.status(401).json({
        error: "Unauthorized Request",
      });
    }
    logger("Inside _id from token" + payload._id);
    req.userPayloadId = payload._id;

    next();
  } catch (error) {
    logger("error", error);
    return res.status(400).json({ msg: "Error: Something went wrong." });
  }
};
