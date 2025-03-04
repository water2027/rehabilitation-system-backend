const { ErrorResponse } = require("../dto/index");

const AuthMiddleware = (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization) {
        ErrorResponse(res, '未登录', 1)
        return
    }
    // Bearer xxx
    const token = authorization.slice(7)
    console.log(token)
	next();
};

module.exports =  AuthMiddleware
