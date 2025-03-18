const Admin = require('../model/admin/admin');
const User = require('../model/user/user');

class AdminRepository {
	async findAdmin() {
		const doctors = await Admin.findAll({
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
	async findUnauthAdmin(info) {
		const doctors = await Admin.findAll({
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
		const doctor = await Admin.findOne({
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
		const doctor = await Admin.findByPk(id, {
			include: [{ model: User, required: true }],
		});
		return doctor;
	}

	/**
	 * @param {Object} info - The registration parameters for the doctor
	 * @param {string} info.auth_id - 用户/医生id
	 * @param {string} info.name - 名字
	 */
	async createAdmin(info) {
		return await Admin.create({ ...info, auth_status: false });
	}
}

module.exports = AdminRepository;
