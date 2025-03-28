const eventBus = require('../utils/eventBus');
const { generateNumericCode } = require('../utils/vCode');
const redis = require('../database/redis');
class UserService {
	/**
	 * 
	 * @param {import('../repository/user')} UserRepository 
	 */
	constructor(UserRepository) {
		this.UserRepository = UserRepository;
	}
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
	 * @returns {Promise<string>} token
	 */
	async Login(telephone, vCode) {
		const value = await redis.get(telephone);
		await redis.del(telephone);
		if (!value) {
			// @ts-ignore
			throw new Error('验证码已过期', {
				cause: 0,
			});
		}

		const data = JSON.parse(value);

		if (data.type !== 'login') {
			// @ts-ignore
			throw new Error('验证码类型错误', {
				cause: 0,
			});
		}

		if (data.code !== vCode) {
			// @ts-ignore
			throw new Error('验证码错误', {
				cause: 0,
			});
		}

		let user = await this.UserRepository.findByTelephone(telephone);
		if (!user) {
			user = await this.UserRepository.createUser({ telephone });
		}

		const resp = {};
		// @ts-ignore
		await eventBus.emit('auth:generate', { id: user.id }, resp);
		const { token } = resp;

		return token;
	}
}

module.exports = UserService;
