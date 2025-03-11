const Patient = require('../model/patient/patient');
const User = require('../model/user/user');
const DoctorToPatient = require('../model/connection/doctor_to_patient');

class PatientRepository {
	async findDoctor() {
		const patients = await Patient.findAll({
			include: [
				{
					model: User,
					required: true,
				},
			],
		});
		return patients;
	}

	/**
	 * 获取已认证医生
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async findAuthPatient(info) {
		const patients = await Patient.findAll({
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
		return patients;
	}

	/**
	 * 获取所有未认证患者
	 * @param {Object} info
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	 */
	async findUnauthPatient(info) {
		const patients = await Patient.findAll({
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
		return patients;
	}

	/**
	 * 根据id或者手机号获取医生
	 * @param {Object} info
	 * @param {string} info.telephone
	 */
	async findByTelephone(info) {
		const patient = await Patient.findOne({
			where: info,
			include: [{ model: User, required: true, where: info }],
		});
		return patient;
	}

	/**
	 * 根据医生id获取对应的患者列表
	 * @param {Object} info
	 * @param {number} info.doctorId
	 * @param {number} info.pageNumber
	 * @param {number} info.pageSize
	*/
	async findDoctorPatient(info) {
		const patients = await Patient.findAll({
			include:[
				{
					model: DoctorToPatient,
					where: { doctor_id: info.doctorId },
					required: true,
				},
				{
					model: User,
					required: true,
				},
			],
			limit: info.pageSize,
			offset: (info.pageNumber - 1) * info.pageSize,
		})
		return patients;
	}

	/**
	 * 
	 * @param {string} id 
	 * @returns 
	 */
	async findById(id) {
		const patient = await Patient.findByPk(id, {
			include: [{ model: User, required: true }],
		});
		return patient;
	}

	/**
	 * @param {Object} info - The registration parameters for the doctor
	 * @param {number} info.gender - 性别0男1女
     * @param {string} info.birthday - 生日
     * @param {string} info.height - 身高
     * @param {string} info.weight - 体重
	 * @param {string} info.allergicHistory - 过敏史
	 * @param {string} info.illnessHistory - 病史
	 * @param {string} info.remark - 其它情况说明
	 * @param {string} info.patient_id - 用户/患者id
	 * @param {string} info.name - 名字
	 */
	async createPatient(info) {
		return await Patient.create({ ...info, auth_status: false });
	}
}

module.exports = PatientRepository;
