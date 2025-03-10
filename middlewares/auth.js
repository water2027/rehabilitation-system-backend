const { ErrorResponse } = require('../dto/index');
const { verifyToken } = require('../utils/jwt');
const redis = require('../database/redis');

/**
 * 
 * @param {number} authLevel 表示需要几级的权限
 * 0 未实名
 * 1 用户
 * 2 医生
 * 3 管理员
 * @returns 
 */
const AuthMiddleware = (authLevel) => {
	return async (req, res, next) => {
		const { authorization } = req.headers;
		if (!authorization) {
			return ErrorResponse(res, '未登录', 1);
		}
		// Bearer xxx
		const token = authorization.slice(7);
		try {
			const { id } = verifyToken(token);
			let level = await redis.get(id)
			if (!level||level <= authLevel - 1) {
				// 打去认证
				return ErrorResponse(res, '无权限', 3);
			}
			level = parseInt(level);
			req.user = { id, level };
			next();
		} catch (error) {
			switch (error.name) {
				case 'TokenExpiredError':
					return ErrorResponse(res, 'token过期', 1);
				case 'JsonWebTokenError':
					return ErrorResponse(res, '无效的 Token', 1);
				default:
					console.error(error);
					return ErrorResponse(res, '未知的错误', 1);
			}
		}
	};
};

module.exports = AuthMiddleware;
