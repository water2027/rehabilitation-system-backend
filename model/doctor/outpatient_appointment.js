const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const OutpatientAppointment = sequelize.define('outpatient_appointment', {
    appointment_id: {
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
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = OutpatientAppointment;