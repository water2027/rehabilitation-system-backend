const DoctorRepository = require('../repository/doctor');
const sequelize = require('../database/db');
const UserRepository = require('../repository/user');
class DoctorService {
	/**
	 *
	 * @param {Object} info - The registration parameters for the doctor
	 * @param {number} info.gender - 性别0男1女
	 * @param {string} info.doctor_id - 用户/医生id
	 * @param {string} info.position - 职位
	 * @param {string|number} info.workingExperience - 工作经历
	 * @param {string} info.professionalExperience - 学术经历
	 * @param {string} info.introduction - 个人简介
	 * @param {string} info.name - 名字
	 * @param {boolean} info.auth_status - 不应该出现的字段
	 */
	async Register(info) {
        if(info.auth_status !== undefined && info.auth_status !== null) {
            throw new Error('auth_status should not be provided', {
                cause: 1,
            });
        }
        await sequelize.query('START TRANSACTION');
        try {
            const user = await UserRepository.findById(info.doctor_id);
            if (!user) {
                throw new Error('User not found', {
                    cause: 1,
                });
            }
            await DoctorRepository.createDoctor(info);
            await sequelize.query('COMMIT');
            return '注册成功，请等待审核';
        } catch (error) {
            await sequelize.query('ROLLBACK');
            throw error;
        }

    }
}

module.exports = new DoctorService();
