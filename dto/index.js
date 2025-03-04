/**
 *
 * @param {Response} res
 * @param {any} data
 * @param {string} message
 * @param {number} code
 */
const SuccessResponse = (res, data = null, message = 'success', code = 100) => {
	res.status(200).json({ code, message, data });
};


/**
 *
 * @param {Response} res
 * @param {any} data
 * @param {string} message
 * @param {number} code
 */
const ErrorResponse = (res, message = 'fail', code = 0) => {
	res.status(200).json({ code, message, data: null });
};

module.exports = {
    SuccessResponse,
    ErrorResponse
};
