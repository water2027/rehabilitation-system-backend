// const DoctorRepository = require('../repository/doctor');
// const sequelize = require('../database/db');
// const UserRepository = require('../repository/user');
const PatientRepository = require('../repository/patient');
class DoctorService {
	/**
	 * 获取所有已认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAuthPatient(info) {
		const patients = await PatientRepository.findAuthPatient(info);
		return patients;
	}
}

module.exports = new DoctorService();
