const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const PlanConnectPatient = sequelize.define('plan_connect_patient', {
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

module.exports = PlanConnectPatient;