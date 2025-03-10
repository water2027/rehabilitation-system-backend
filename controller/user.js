const { SuccessResponse, ErrorResponse } = require('../dto/index');
const UserService = require('../service/user');

class UserController {
	SendCode(req, res) {
		const { telephone } = req.body;
		if (!telephone) {
			return ErrorResponse(res, '缺少手机号');
		}
		UserService.SendCode(telephone)
			.then(() => {
				return SuccessResponse(res);
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
	/**
	 * 
	 * 实名认证，认证成功重新发放token
	 *  
	 * @returns 
	 */
	RealNameAuth(req, res) {
		const { name } = req.body;
		const { id } = req.user;
		if(!name) {
			return ErrorResponse(res, '缺少名字')
		}
		UserService.RealNameAuth(id, name)
		.then(token=> {
			return SuccessResponse(res, token)
		})
		.catch(err=> {
			if (err instanceof Error) {
				return ErrorResponse(
					res,
					err.message,
					err.cause ? err.cause : 0
				);
			}
			return ErrorResponse(res, err);
		})
	}

	/**
	 * 如果token没过期，发放新token
	 * 
	 * 
	 */
	RefreshToken(req, res) {
		const { id, level } = req.user;
		UserService.RefreshToken(id, level)
		.then(token=> {
			return SuccessResponse(res, token)
		})
		.catch(err=>{
			if (err instanceof Error) {
				return ErrorResponse(
					res,
					err.message,
					err.cause ? err.cause : 0
				);
			}
			return ErrorResponse(res, err);
		})
	}
}

module.exports = new UserController();
