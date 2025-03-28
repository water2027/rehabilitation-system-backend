const { generateToken, verifyToken } = require('../utils/jwt');
const redis = require('../database/redis');

// 统一的权限认证服务
// 负责token的生成、验证、刷新等操作
class AuthService {
	/**
	 * 
	 * @param {import('../repository/user')} UserRepository 
	 */
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
		const user = await this.UserRepository.findById(id);
		if (!user) {
			throw new Error('User not found');
		}
		const level = user.get('level') ? user.get('level') : 0;
		// @ts-ignore
		const token = generateToken(user.get('id'));
		redis.set(user.get('id'), level);
		resp.token = token;
	}

	async verify(req, resp) {
		const { token } = req;
		const decoded = verifyToken(token);
		if (!decoded || typeof decoded === 'string') {
			return -1;
		}
		let level = await redis.get(decoded.id);
		const levelInt = parseInt(level);
		if (!level) {
			throw new Error('Level not found');
		}
		resp.id = decoded.id;
		resp.level = levelInt;
	}

	async delete(req, resp) {
		const { id } = req;
		redis.del(id);
		resp.status = true;
	}
}

module.exports = AuthService;
