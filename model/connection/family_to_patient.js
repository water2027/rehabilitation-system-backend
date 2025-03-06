const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const FamilyConnectPatient = sequelize.define('family_to_patient', {
    connection_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    patient_id:{
        type: DataTypes.UUID,
        allowNull: false
    },
    family_id:{
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = FamilyConnectPatient;