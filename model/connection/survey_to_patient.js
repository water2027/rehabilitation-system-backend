const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');
const Patient = require('../patient/patient');

const SurveyToPatient = sequelize.define('survey_to_patient', {
	connection_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	patient_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	survey_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	advice:{
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: ''
	}
});

Patient.hasMany(SurveyToPatient, {
	foreignKey: 'patient_id',
});

SurveyToPatient.belongsTo(Patient, {
	foreignKey: 'patient_id',
});

module.exports = SurveyToPatient;
