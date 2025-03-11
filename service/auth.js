const sequelize = require('../database/db');

const DoctorRepository = require('../repository/doctor');
const AuthRepository = require('../repository/auth');
const PatientRepository = require('../repository/patient');
class AuthService {
	/**
	 * 获取所有未认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAllUnauthPatient(info) {
		const patients = await PatientRepository.findUnauthPatient(info);
		return patients;
	}

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
	 * 获取所有未认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAllUnauthAuth(info) {
		const auths = await AuthRepository.findUnauthAuth(info);
		return auths;
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
	async authPatient(info) {
		await sequelize.query('START TRANSACTION');
		try {
			const patient = await PatientRepository.findById(info.id);
			if (!patient) {
				throw new Error('Patient not found');
			}
			patient.auth_status = !patient.auth_status;
			await patient.save();
			patient.user.level = patient.auth_status ? 1 : 0;
			await patient.user.save();
			await sequelize.query('COMMIT');
		} catch (err) {
			await sequelize.query('ROLLBACK');
			throw err;
		}
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

	/**
	 *
	 * @param {Object} info
	 * @param {string} info.id
	 */
	async authAuth(info) {
		await sequelize.query('START TRANSACTION');
		try {
			const auth = await AuthRepository.findById(info.id);
			if (!auth) {
				throw new Error('Auth not found');
			}
			auth.auth_status = true;
			await auth.save();
			auth.user.level = 3;
			await auth.user.save();
			await sequelize.query('COMMIT');
		} catch (err) {
			await sequelize.query('ROLLBACK');
			throw err;
		}
	}
}

module.exports = new AuthService();
