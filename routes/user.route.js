const express = require("express");
const { getAllUsers, getAnUser } = require("../controller/user.controller");
const isAuthenticated = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");
const router = express.Router();

router.get("/:userId", getAnUser);
router.get("/", isAdmin, isAuthenticated, getAllUsers); //admin

// router.put("/:userId"); //user
// router.delete("/:userId"); //user

module.exports = router;
