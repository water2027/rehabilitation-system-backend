/* eslint-disable no-unused-vars */
/**
 * 全局错误处理中间件
 */
const { ErrorResponse } = require('../dto');

const errorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    return ErrorResponse(
      res,
      err.message,
      err.cause ? err.cause : 0
    );
  }
  return ErrorResponse(res, err);
};

module.exports = errorHandler;