const { default: mongoose } = require("mongoose");
const userModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find({});
		res.status(200).json(users);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getAnUser = async (req, res) => {
	try {
		const { userId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			throw new error("Invalid User ID");
		}
		const user = await userModel.findById(userId);

		if (!user) {
			throw new error("User not found");
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { getAllUsers, getAnUser };
