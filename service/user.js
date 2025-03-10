const UserRepository = require('../repository/user');
const { generateToken } = require('../utils/jwt');
const { generateNumericCode } = require('../utils/v_code');
const redis = require('../database/redis');
class UserService {
	async SendCode(telephone) {
		const code = generateNumericCode();
		await redis.set(
			telephone,
			{
				code,
				type: 'login',
			},
			5 * 60
		);

	}
	/**
	 *
	 * @param {string} telephone
	 * @param {string} vCode
	 * @returns {string} token
	 */
	async Login(telephone, vCode) {
		const value = await redis.get(telephone);
		if (!value) {
			throw new Error('验证码已过期', {
				cause: 0,
			});
		}

		const data = JSON.parse(value);

		if(data.type !== 'login') {
			throw new Error('验证码类型错误', {
				cause: 0,
			});
		}

		if (data.code !== vCode) {
			throw new Error('验证码错误', {
				cause: 0,
			});
		}

		let user = await UserRepository.findByTelephone(telephone);
		if (!user) {
			user = await UserRepository.createPatient({ telephone });
		}
		if (!user.get('name')) {
			throw new Error('需要完善个人信息', {
				cause: 3,
			});
		}

		// TODO: 发放token
		return generateToken(user.get('id'), 'user');
	}
}

module.exports = new UserService();
