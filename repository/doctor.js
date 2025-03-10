const Doctor = require('../model/doctor/doctor');
const User = require('../model/user/user');

class DoctorRepository {
	async findDoctor() {
		const doctors = await Doctor.findAll({
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
	 * 获取已认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async findAuthDoctor(info) {
		const doctors = await Doctor.findAll({
			where: { auth_status: true },
			include: [
				{
					model: User,
					required: true,
				},
			],
			limit: info.pageSize,
			offset: (info.pageNumber - 1) * info.pageSize,
		});
		return doctors
	}

	/**
	 * 获取所有未认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async findUnauthDoctor(info) {
		const doctors = await Doctor.findAll({
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
		const doctor = await User.findOne({
			where: info,
			include: [{ model: Doctor, required: true }],
		});
		return doctor;
	}

	async findById(id) {
		const doctor = await Doctor.findByPk(id, {
			include: [{ model: User, required: true }],
		});
		return doctor;
	}

	/**
	 * @param {Object} info - The registration parameters for the doctor
	 * @param {number} info.gender - 性别0男1女
	 * @param {string} info.doctor_id - 用户/医生id
	 * @param {string} info.position - 职位
	 * @param {string|number} info.workingExperience - 工作经历
	 * @param {string} info.professionalExperience - 学术经历
	 * @param {string} info.introduction - 个人简介
	 * @param {string} info.name - 名字
	 */
	async createDoctor(info) {
		return await Doctor.create({ ...info, auth_status: false });
	}
}

module.exports = new DoctorRepository();
