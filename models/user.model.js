const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		phone: { type: String },
		address: { type: String },
		books: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Book",
			},
		],
	},
	{ timestamps: true }
);

module.export = mongoose.model("User", userSchema);
