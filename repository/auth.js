const Auth = require('../model/auth/auth');
const User = require('../model/user/user');

class AuthRepository {
	async findAuth() {
		const doctors = await Auth.findAll({
			include: [
				{
					model: User,
					required: true,
				},
			],
		});
		return doctors;
	}

	/**
	 * 获取所有未认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async findUnauthAuth(info) {
		const doctors = await Auth.findAll({
			where: { auth_status: false },
			include: [
				{
					model: User,
					required: true,
				},
			],
			limit: info.pageSize,
			offset: (info.pageNumber - 1) * info.pageSize,
		});
		return doctors;
	}

	/**
	 * 根据id或者手机号获取医生
	 * @param {Object} info
	 * @param {string} info.telephone
	 */
	async findByTelephone(info) {
		const doctor = await Auth.findOne({
			where: info,
			include: [{ model: User, required: true, where: info }],
		});
		return doctor;
	}

	/**
	 * 
	 * @param {string} id 
	 * @returns 
	 */
	async findById(id) {
		const doctor = await Auth.findByPk(id, {
			include: [{ model: User, required: true }],
		});
		return doctor;
	}

	/**
	 * @param {Object} info - The registration parameters for the doctor
	 * @param {string} info.auth_id - 用户/医生id
	 * @param {string} info.name - 名字
	 */
	async createAuth(info) {
		return await Auth.create({ ...info, auth_status: false });
	}
}

module.exports = AuthRepository;
