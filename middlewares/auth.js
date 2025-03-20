const { ErrorResponse } = require('../dto/index');
const eventBus = require('../utils/eventBus');

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
			const resp = {};
			await eventBus.emit('auth:verify', { token }, resp);
			const { id, level } = resp;
			if (!id) {
				return ErrorResponse(res, '无效的 Token', 1);
			}
			if (level <= authLevel - 1) {
				return ErrorResponse(res, '无权限', 3);
			}
			req.user = { id, level };
			next();
		} catch (error) {
			console.error(error);
			return ErrorResponse(res, '验证错误', 1);
		}
	};
};

module.exports = AuthMiddleware;
