const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

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
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
});

module.exports = SurveyToPatient;
