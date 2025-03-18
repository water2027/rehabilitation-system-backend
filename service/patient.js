class PatientService {
	constructor(DoctorRepository) {
		this.DoctorRepository = DoctorRepository;
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
