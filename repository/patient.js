// import Patient from '../model/patient/patient.js';
const Patient = require('../model/patient/patient')

class PatientRepository {
	async findAll() {
		return await Patient.findAll();
	}

	async findById(id) {
		return await Patient.findByPk(id);
	}

	async findByTelephone(telephone) {
		return await Patient.findOne({ where: { telephone } });
	}

    /**
     * 
     * @param {Object} patient 
     * @param {string} patient.telephone 
     * @param {string} patient.name 
     */
    async createPatient(patient) {
        return await Patient.create(patient);
    }
}

export default new PatientRepository();
