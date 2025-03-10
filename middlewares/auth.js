const { ErrorResponse } = require('../dto/index');
const { verifyToken } = require('../utils/jwt');

const AuthMiddleware = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return ErrorResponse(res, '未登录', 1);
	}
	// Bearer xxx
	const token = authorization.slice(7);
	try {
		const { id, level } = verifyToken(token);
		const isRealNameAuthRoute = req.path === '/auth/realNameAuth';
		if (level === 0 && !isRealNameAuthRoute) {
			return ErrorResponse(res, '未实名认证', 3);
		}
		req.user = { id, level };
		next();
	} catch (error) {
		switch (error.name) {
			case 'TokenExpiredError':
				return ErrorResponse(res, 'token过期', 1);
			case 'JsonWebTokenError':
				return ErrorResponse(res, '无效的 Token', 1);
			default:
				return ErrorResponse(res, '未知的错误', 1);
		}
	}
};

module.exports = AuthMiddleware;
