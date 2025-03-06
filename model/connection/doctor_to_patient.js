const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const DoctorToPatient = sequelize.define('doctor_to_patient', {
    connection_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    patient_id:{
        type: DataTypes.UUID,
        allowNull: false
    },
    doctor_id:{
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = FamilyConnectPatient;