const { generateToken } = require('../utils/jwt');
const redis = require('../database/redis');

// 统一的权限认证服务
// 负责token的生成、验证、刷新等操作
class AuthService {
	constructor(UserRepository) {
		this.UserRepository = UserRepository;
	}

	/**
	 *
	 * @param {Object} req
	 * @param {string} req.id
	 * @param {Object} resp
	 */
	async generate(req, resp) {
		const { id } = req;
		const user = this.UserRepository.findById(id);
		if (!user) {
			throw new Error('User not found');
		}
		const level = user.get('level') ? user.get('level') : 0;
		const token = generateToken(user.get('id'));
		redis.set(user.get('id'), level);
		resp.token = token;
	}

	/**
	 *
	 * @param {string} token
	 */
	async verify(req, resp) {
		const { token } = req;
		const decoded = await this.decodeToken(token);
		if (!decoded) {
			return -1;
		}
		let level = redis.get(decoded.id);
		level = parseInt(level);
		if (!level) {
			throw new Error('Level not found');
		}
		resp.id = decoded.id;
		resp.level = level;
	}

	async delete(req, resp) {
		const { id } = req;
		redis.del(id);
		resp.status = true;
	}
}

module.exports = AuthService;
