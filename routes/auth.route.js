const express = require("express");

const router = express.Router();

router.post("/signUp", createUser);
router.post("/signIn", LoginUser);

module.exports = router;
