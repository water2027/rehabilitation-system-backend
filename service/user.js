const UserRepository = require('../repository/user');
const { generateToken } = require('../utils/jwt');

class UserService {
	/**
	 * 
	 * @param {string} telephone 
	 * @param {string} vCode 
	 * @returns {string} token
	 */
	async Login(telephone, vCode) {
		// TODO: 从redis获取vCode
		
		let user = await UserRepository.findByTelephone(telephone)
		if (!user) {
			user = await UserRepository.createPatient({ telephone })
		}
		if(!user.get('name')) {
			throw new Error('需要完善个人信息', {
				cause: 3
			});
		}

		// TODO: 发放token
		return generateToken(user.get('id'), 'user');
	}
}



module.exports = new UserService();
