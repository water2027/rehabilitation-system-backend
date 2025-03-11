const CryptoJS = require('crypto-js');

const SECRET_KEY = process.env.SECRET_KEY || 'dev key';

class EncryptionService {
	/**
	 * 
	 * @param {Object} data 
	 * @returns 
	 */
	static encrypt(data) {
		const jsonString = JSON.stringify(data);
		const encrypted = CryptoJS.AES.encrypt(
			jsonString,
			SECRET_KEY
		).toString();
		return encrypted;
	}

	/**
	 * 
	 * @param {string} data 
	 * @returns 
	 */
	static decrypt(data) {
		try {
			const decrypted = CryptoJS.AES.decrypt(data, SECRET_KEY);
			const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
			return JSON.parse(jsonString);
		} catch (err) {
			console.error(err);
			return null;
		}
	}
}

module.exports = EncryptionService;
