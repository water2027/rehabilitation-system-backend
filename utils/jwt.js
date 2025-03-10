const jwt = require('jsonwebtoken');

/**
 *
 * @param {string} id
 * @param {number} level 0未认证 1用户 2医生 3管理员
 * @param {string} expiresIn 默认 30d
 * @returns {string} token
 */
function generateToken(id, level, expiresIn = '30d') {
	if (!id || level === undefined || level === null || level < 0) {
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
