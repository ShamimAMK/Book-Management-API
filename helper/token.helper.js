const jwt = require("jsonwebtoken");

//payload
//signin secrete
//duration

const createToken = (_id) => {
	const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
	return token;
};

module.exports = createToken;
