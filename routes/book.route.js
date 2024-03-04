const express = require("express");

const router = express.Router();

router.post("/");
router.get("/");
router.get("/:bookId");
router.put("/:bookId");
router.delete("/:bookId");

module.exports = router;
