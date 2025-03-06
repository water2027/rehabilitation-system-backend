const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const PlanToPatient = sequelize.define('plan_to_patient', {
    plan_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    patient_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
});

module.exports = PlanToPatient;