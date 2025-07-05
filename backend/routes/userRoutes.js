const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerUser,
  userLogin,
  getUser,
} = require("../controllers/userController");
const user = require("../models/user");
const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

router.post("/register", protect, adminOnly, registerUser);
router.post("/login", userLogin);

router.get("/", protect, adminOnly, getUser);
// /user/me (protected route)
router.get("/me", protect, (req, res) => {
  res.json(req.user); // assuming protect middleware adds req.user from token
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // true in production (HTTPS)
  });
  res.json({ message: "Logged out successfully" });
});

//protect route
router.get("/profile", protect, adminOnly, async (req, res) => {
  res.send("User profile");
});

module.exports = router;
