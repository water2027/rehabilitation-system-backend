const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const LectureToPatient = sequelize.define('lecture_to_patient', {
    connection_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    patient_id:{
        type: DataTypes.UUID,
        allowNull: false
    },
    lecture_id:{
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = LectureToPatient;