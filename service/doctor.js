class DoctorService {
	constructor(PatientRepository) {
		this.PatientRepository = PatientRepository
	}
	/**
	 * 获取所有已认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async getAuthPatient(info) {
		const patients = await this.PatientRepository.findAuthPatient(info);
		return patients;
	}

	/**
	 * 获取某医生的患者列表
	 * @param {Object} info
	 * @param {number} info.doctorId
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 * @returns {Promise<Array<any>>}
	*/
	async getDoctorPatient(info) {
		const patients = await this.PatientRepository.findDoctorPatient(info);
		return patients;
	}
}

module.exports = DoctorService;
