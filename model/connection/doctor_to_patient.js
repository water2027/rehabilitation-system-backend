const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');
const Patient = require('../patient/patient');
const Doctor = require('../doctor/doctor');

const DoctorToPatient = sequelize.define('doctor_to_patient', {
	connection_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	patient_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	doctor_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
});

// 多对多联系
Patient.belongsToMany(Doctor, {
	through: DoctorToPatient,
	foreignKey: 'patient_id',
});

Doctor.belongsToMany(Patient, {
	through: DoctorToPatient,
	foreignKey: 'doctor_id',
});

Patient.hasMany(DoctorToPatient, {
	foreignKey: 'patient_id',
});

DoctorToPatient.belongsTo(Patient, {
	foreignKey: 'patient_id',
});

module.exports = DoctorToPatient;
