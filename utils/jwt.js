const jwt = require('jsonwebtoken');

function generateToken(id, level, expiresIn = '30d') {
	if(!id || !level) {
		throw new Error('id and level are required');
	}
	return jwt.sign(
		{ id, level, type: 'access', iat: Date.now() },
		process.env.JWT_SECRET,
		{
			expiresIn,
		}
	);
}

function verifyToken(token) {
	return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
	generateToken,
	verifyToken,
};
