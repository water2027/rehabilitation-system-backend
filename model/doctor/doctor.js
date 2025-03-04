const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Doctor = sequelize.define('doctor', {
    doctor_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    auth_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Doctor;