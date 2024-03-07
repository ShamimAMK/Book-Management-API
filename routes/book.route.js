const express = require("express");
const {
	createBook,
	getAllBooks,
	getABook,
	updateABook,
	deleteABook,
} = require("../controller/book.controller");
const isAuthenticated = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:bookId", getABook);
router.post("/", isAuthenticated, createBook); // user
router.put("/:bookId", isAuthenticated, updateABook); //user
router.delete("/:bookId", isAuthenticated, deleteABook); //user

module.exports = router;

//CRUD OPERATION DONE
