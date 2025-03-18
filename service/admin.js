const sequelize = require('../database/db');

class AdminService {
	constructor(AdminRepository, DoctorRepository, PatientRepository) {
		this.AdminRepository = AdminRepository;
		this.DoctorRepository = DoctorRepository;
		this.PatientRepository = PatientRepository;
	}
	/**
	 * 获取所有未认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAllUnauthPatient(info) {
		const patients = await this.PatientRepository.findUnauthPatient(info);
		return patients;
	}

	/**
	 * 获取所有未认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAllUnauthDoctor(info) {
		const doctors = await this.DoctorRepository.findUnauthDoctor(info);
		return doctors;
	}

	/**
	 * 获取所有未认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAllUnauthAdmin(info) {
		const admins = await this.AdminRepository.findUnauthAdmin(info);
		return admins;
	}

	/**
	 * 获取所有已认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAllAuthDoctor(info) {
		const doctors = await this.DoctorRepository.findAuthDoctor(info);
		return doctors;
	}

	/**
	 * 获取所有医生
	 */
	async getAllDoctor(info) {
		const doctors = await this.DoctorRepository.findDoctor(info);
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
			const patient = await this.PatientRepository.findById(info.id);
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
			const doctor = await this.DoctorRepository.findById(info.id);
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
	async authAdmin(info) {
		await sequelize.query('START TRANSACTION');
		try {
			const admin = await this.AdminRepository.findById(info.id);
			if (!admin) {
				throw new Error('admin not found');
			}
			admin.auth_status = true;
			await admin.save();
			admin.user.level = 3;
			await admin.user.save();
			await sequelize.query('COMMIT');
		} catch (err) {
			await sequelize.query('ROLLBACK');
			throw err;
		}
	}
}

module.exports = AdminService;
