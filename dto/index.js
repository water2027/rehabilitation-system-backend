const SuccessResponse = (res, data = null, message = "success", code = 100) => {
	res.status(200).json({code, message, data});
};

const ErrorResponse = (res, message, code) => {
    res.status(200).json({code, message, data:null});
};

export { SuccessResponse, ErrorResponse };