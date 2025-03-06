const EncryptionService = require('../utils/encryption')


/**
 * @param {Object} response
 * @param {number} response.code
 * @param {any} response.data
 * @param {string} response.message
 * 
 */
const EncryptResponse = (response) => {
    if(!process.env.PRODUCTION_ENV) {
        return response
    }
    try {
        const encryptedData = EncryptionService.encrypt(response)
        return {
            data:encryptedData
        }
    }catch(err) {
        console.error('加密失败！', err)
        return {
            data: '服务器错误'
        }
    }
}

/**
 *
 * @param {Response} res
 * @param {any} data
 * @param {string} message
 * @param {number} code
 */
const SuccessResponse = (res, data = null, message = 'success', code = 100) => {
	res.status(200).json(EncryptResponse({ code, message, data }));
};


/**
 *
 * @param {Response} res
 * @param {any} data
 * @param {string} message
 * @param {number} code
 */
const ErrorResponse = (res, message = 'fail', code = 0) => {
	res.status(200).json(EncryptResponse({ code, message, data:null }));
};

module.exports = {
    SuccessResponse,
    ErrorResponse
};
