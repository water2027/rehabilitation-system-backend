const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET||"qwertyuiopasdfghjklzxcvbnm";

/**
 *
 * @param {string} id
 * @param {string} expiresIn 默认 30d
 * 	- `${value}d`
 * @returns {string} token
 */
function generateToken(id, expiresIn = '30d') {
	if (!id) {
		throw new Error('id and level are required');
	}
	const payload = {
		id,
		type: 'access',
		iat: Math.floor(Date.now() / 1000),
	}

	const options = {
		expiresIn,
	}
	// @ts-ignore
	return jwt.sign(
		payload,
		jwtKey,
		options
	);
}

/**
 * 
 * @param {string} token 
 * @returns 
 */
function verifyToken(token) {
	return jwt.verify(token, jwtKey);
}

module.exports = {
	generateToken,
	verifyToken,
};
