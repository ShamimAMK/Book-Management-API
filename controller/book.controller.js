const { default: mongoose } = require("mongoose");
const bookModel = require("../models/book.model");

const createBook = async (req, res) => {
	try {
		const { title, image, author, genre, description } = req.body;
		const userId = req.user?._id;

		if (!title || !image || !author || !genre) {
			throw new Error("Title, image, author and genre are required");
		}

		const book = await bookModel.create({
			title,
			image,
			author,
			genre,
			description,
			user: userId,
		});

		res.status(201).json(book);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getAllBooks = async (req, res) => {
	try {
		const books = await bookModel.find({}).populate("user").exec();
		res.status(200).json(books);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getABook = async (req, res) => {
	try {
		const { bookId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(bookId)) {
			throw new Error("Invalid book id");
		}

		const book = await bookModel.findById(bookId).populate("user").exec();

		if (!book) {
			throw new Error("Book not found");
		}
		res.status(200).json(book);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateABook = async (req, res) => {
	try {
		const { bookId } = req.params;
		const { title, image, author, genre, description } = req.body;
		const userId = req.user?._id;

		if (!mongoose.Types.ObjectId.isValid(bookId)) {
			throw new Error("Invalid book id");
		}

		const book = await bookModel.findById(bookId);
		if (!book) {
			throw new Error("Book not found");
		}
		if (book.user.toString() !== userId.toString()) {
			throw new Error("Forbidden");
		}

		const updatedBook = await bookModel.findByIdAndUpdate(
			bookId,
			{
				title,
				image,
				author,
				genre,
				description,
			},
			{ new: true }
		);

		res.status(200).json(updatedBook);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteABook = async (req, res) => {
	try {
		const { bookId } = req.params;
		const userId = req.user?._id;

		if (!mongoose.Types.ObjectId.isValid(bookId)) {
			throw new Error("Invalid book id");
		}

		const book = await bookModel.findById(bookId);

		if (!book) {
			throw new Error("Book not found");
		}

		if (book.user.toString() !== userId.toString()) {
			throw new Error("Forbidden");
		}

		await bookModel.findByIdAndDelete(bookId);

		res.status(200).json({ message: "Book deleted successfully", book });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	createBook,
	getAllBooks,
	getABook,
	updateABook,
	deleteABook,
};
