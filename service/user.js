const UserRepository = require('../repository/user');
const { generateToken } = require('../utils/jwt');
const { generateNumericCode } = require('../utils/v_code');
const redis = require('../database/redis');
class UserService {
	async SendCode(telephone) {
		const code = generateNumericCode();

		// TODO: 使用短信服务发送验证码
		console.log('验证码：', code);

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

		if (data.type !== 'login') {
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
			user = await UserRepository.createUser({ telephone });
		}
		const level = user.get('level') ? user.get('level') : 0;

		return generateToken(user.get('id'), level);
	}

	async RefreshToken(id) {
		const user = UserRepository.findById(id);
		if (!user) {
			throw new Error('用户不存在', {
				cause: 1,
			});
		}
		const level = user.get('level') ? parseInt(user.get('level')) : 0;
		return generateToken(id, level);
	}
}

module.exports = new UserService();
