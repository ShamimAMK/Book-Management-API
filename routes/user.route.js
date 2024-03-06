const express = require("express");
const { getAllUsers, getAnUser } = require("../controller/user.controller");

const router = express.Router();

router.get("/", getAllUsers); //admin
router.get("/:userId", getAnUser); //
router.put("/:userId"); //user
router.delete("/:userId"); //user

module.exports = router;
