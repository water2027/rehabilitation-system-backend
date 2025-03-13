const { generateToken } = require('../utils/jwt');

const { sequelizeWithTransaction } = require('../utils/withTransaction');

const DoctorRepository = require('../repository/doctor');
const UserRepository = require('../repository/user');
const AuthRepository = require('../repository/auth');
const PatientRepository = require('../repository/patient');

class PublicService {
	constructor() {
		this.PatientRepository = new PatientRepository();
		this.UserRepository = new UserRepository();
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
				throw new Error('User not found', {
					cause: 1,
				});
			}
			await this.PatientRepository.createPatient(info);

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
	 * @param {undefined} info.auth_status - 不应该出现的字段
	 */
	async DoctorRegister(info) {
		const user = await this.UserRepository.findById(info.doctor_id);
		if (!user) {
			throw new Error('User not found', {
				cause: 1,
			});
		}
		await DoctorRepository.createDoctor(info);
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
			throw new Error('User not found', {
				cause: 1,
			});
		}
		await AuthRepository.createAuth(info);
		return '注册成功，请等待审核';
	}

	async RefreshToken(id) {
		const user = await this.UserRepository.findById(id);
		if (!user) {
			throw new Error('用户不存在', {
				cause: 1,
			});
		}
		const level = user.level ? parseInt(user.level) : 0;
		return generateToken(id, level);
	}
}

module.exports = PublicService;
