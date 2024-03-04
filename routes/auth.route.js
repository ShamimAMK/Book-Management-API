const express = require("express");
const { createUser, loginUser } = require("../controller/auth.controller");

const router = express.Router();

router.post("/signUp", createUser);
router.post("/signIn", loginUser);

module.exports = router;
