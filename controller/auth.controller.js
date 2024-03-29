const validator = require("validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const createToken = require("../helper/token.helper");

const createUser = async (req, res) => {
	try {
		const { name, email, password, phone, address } = req.body;

		//checking required fields
		if (!email || !name || !password)
			throw new Error(" Name, Email, Password is required");

		//validate email
		if (!validator.isEmail(email)) throw new Error("Invalid email");

		// validate password
		if (!validator.isStrongPassword(password))
			throw new Error(
				"Password must contain at least 8+ chars, Uppercase, Lowercase, number and symbol"
			);

		// Check if the user exists or not
		const isExist = await userModel.findOne({ email });

		if (isExist) throw new Error("Email already in use");

		//password encryption
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		//create an user
		const user = await userModel.create({
			name,
			email,
			password: hashPassword,
			phone,
			address,
		});

		//create a Token
		const token = createToken(user._id);

		res.status(201).json({ user, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		//required fields
		if (!email || !password) throw new Error("Email, Password is incorrect");

		//check the is exists or not
		const user = await userModel.findOne({ email });
		if (!user) throw new Error("User not found");

		// password decryption
		const match = await bcrypt.compare(password, user.password);

		if (!match) throw new Error("User not found");

		//create a Token
		const token = createToken(user._id);

		res.status(201).json({ user, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { createUser, loginUser };
