const { SuccessResponse, ErrorResponse } = require('../dto/index');
const UserService = require('../service/user');

class UserController {
	constructor() {
		this.UserService = new UserService();
	}
	SendCode(req, res, next) {
		const { telephone } = req.body;
		// 正则表达式判断手机号
		if (
			!/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(
				telephone
			)
		) {
			return ErrorResponse(res, '手机号不正确');
		}
		this.UserService.SendCode(telephone)
			.then(() => {
				return SuccessResponse(res);
			})
			.catch((err) => {
				next(err);
			});
	}
	Login(req, res, next) {
		const { telephone, vCode } = req.body;
		if (
			!/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(
				telephone
			) ||
			!vCode
		) {
			return ErrorResponse(res, '手机号或验证码不正确');
		}
		this.UserService.Login(telephone, vCode)
			.then((token) => {
				return SuccessResponse(res, token);
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = new UserController();
