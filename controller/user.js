const { SuccessResponse, ErrorResponse } = require('../dto/index.js');

class UserController {
	/**
	 *
	 * @param {Object} LoginRequest
	 * @param {string} LoginRequest.telephone
	 * @param {string} LoginRequest.vCode
	 */
	UserLogin(LoginRequest) {}
}

module.exports = new UserController();
