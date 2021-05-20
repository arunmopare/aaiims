var express = require("express");
const { isAuthenticated } = require("../../middleware/auth");
const {
  signInWithEmailPassword,
  signUpWithEmailPassword,
  checkDuplicateEmail,
  getAllUsers,
  deleteUser,
} = require("../controllers/auth");
var router = express.Router();

router.post("/signin", signInWithEmailPassword);
router.post("/signup", checkDuplicateEmail, signUpWithEmailPassword);
router.get("/all-users", getAllUsers);
router.delete("/:userId", deleteUser);

module.exports = router;
