// const sequelize = require('../database/db');
const DoctorRepository = require('../repository/doctor');
// const AuthRepository = require('../repository/auth');
class PatientService {
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
}

module.exports = new PatientService();
