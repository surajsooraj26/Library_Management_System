const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const { getActivity } = require("../controllers/activityController");

router.get("/", protect, adminOnly, getActivity);

module.exports = router;
