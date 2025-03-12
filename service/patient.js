// const sequelize = require('../database/db');
const DoctorRepository = require('../repository/doctor');
// const AuthRepository = require('../repository/auth');
class PatientService {
	constructor(SurveyService) {
		this.SurveyService = SurveyService
		this.DoctorRepository = new DoctorRepository();
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
}

module.exports = PatientService;
