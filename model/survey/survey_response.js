const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const SurveyResponse = sequelize.define('survey_response', {
    response_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    patient_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    survey_id:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = SurveyResponse;
