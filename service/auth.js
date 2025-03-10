const sequelize = require('../database/db');

const DoctorRepository = require('../repository/doctor');
// const AuthRepository = require('../repository/auth');
class AuthService {
	/**
	 * 获取所有未认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAllUnauthDoctor(info) {
		const doctors = await DoctorRepository.findUnauthDoctor(info);
		return doctors;
	}

	/**
	 * 获取所有已认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAllAuthDoctor(info) {
		const doctors = await DoctorRepository.findAuthDoctor(info);
		return doctors;
	}

	/**
	 * 获取所有医生
	 */
	async getAllDoctor(info) {
		const doctors = await DoctorRepository.findDoctor(info);
		return doctors;
	}

	/**
	 *
	 * @param {Object} info
	 * @param {string} info.id
	 */
	async authDoctor(info) {
		await sequelize.query('START TRANSACTION');
		try {
			const doctor = await DoctorRepository.findById(info.id);
			if (!doctor) {
				throw new Error('Doctor not found');
			}
			doctor.auth_status = !doctor.auth_status;
			await doctor.save();
			doctor.user.level = doctor.auth_status ? 2 : 0;
			await doctor.user.save();
			await sequelize.query('COMMIT');
		} catch (err) {
			await sequelize.query('ROLLBACK');
			throw err;
		}
	}
}

module.exports = new AuthService();
