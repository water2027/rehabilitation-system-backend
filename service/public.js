const eventBus = require('../utils/eventBus');

const { sequelizeWithTransaction } = require('../utils/withTransaction');

class PublicService {
	/**
	 * 
	 * @param {import('../repository/admin')} AdminRepository 
	 * @param {import('../repository/doctor')} DoctorRepository
	 * @param {import('../repository/patient')} PatientRepository 
	 * @param {import('../repository/user')} UserRepository 
	 */
	constructor(AdminRepository, DoctorRepository, PatientRepository, UserRepository) {
		this.AdminRepository = AdminRepository;
		this.DoctorRepository = DoctorRepository;
		this.PatientRepository = PatientRepository;
		this.UserRepository = UserRepository;
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
	async PatientRegister(info) {
		const execute = sequelizeWithTransaction();
		return await execute(async () => {
			const user = await this.UserRepository.findById(info.patient_id);
			if (!user) {
				// @ts-ignore
				throw new Error('User not found', {
					cause: 1,
				});
			}
			await this.PatientRepository.createPatient(info);

			// @ts-ignore
			user.level = 1;
			await user.save();
		});
	}
	/**
	 *
	 * @param {Object} info - The registration parameters for the doctor
	 * @param {number} info.gender - 性别0男1女
	 * @param {string} info.doctor_id - 用户/医生id
	 * @param {string} info.position - 职位
	 * @param {string} info.introduction - 个人简介
	 * @param {string} info.name - 名字
	 * @param {string} info.department - 科室
	 */
	async DoctorRegister(info) {
		const user = await this.UserRepository.findById(info.doctor_id);
		if (!user) {
			// @ts-ignore
			throw new Error('User not found', {
				cause: 1,
			});
		}
		await this.DoctorRepository.createDoctor(info);
		return '注册成功，请等待审核';
	}

	/**
	 *
	 * @param {Object} info
	 * @param {string} info.auth_id - 用户id
	 * @param {string} info.name - 用户名
	 */
	async AuthRegister(info) {
		const user = await this.UserRepository.findById(info.auth_id);
		if (!user) {
			// @ts-ignore
			throw new Error('User not found', {
				cause: 1,
			});
		}
		await this.AdminRepository.createAdmin(info);
		return '注册成功，请等待审核';
	}

	async RefreshToken(id) {
		const resp = {};
		await eventBus.emit('auth:generate', { id }, resp);
		const { token } = resp;

		return token;
	}
}

module.exports = PublicService;
