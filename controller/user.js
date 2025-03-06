const { SuccessResponse, ErrorResponse } = require('../dto/index');
const UserService = require('../service/user');

class UserController {
	Login(req, res) {
		const { telephone, vCode } = req.body;
		if (!telephone || !vCode) {
			return ErrorResponse(res, '缺少手机号或验证码');
		}
		UserService.Login(telephone, vCode)
			.then((token) => {
				return SuccessResponse(res, token);
			})
			.catch((err) => {
				if (err instanceof Error) {
					return ErrorResponse(
						res,
						err.message,
						err.cause ? err.cause : 0
					);
				}
				return ErrorResponse(res, err);
			});
	}
}

module.exports = new UserController();
