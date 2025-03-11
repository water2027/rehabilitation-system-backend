const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');
const User = require('../user/user');

const Patient = sequelize.define('patient', {
	patient_id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	gender: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    birthday:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    height:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    allergicHistory:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    illnessHistory:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    remark:{
        type: DataTypes.STRING,
        allowNull: false,
    },
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	auth_status: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

User.hasOne(Patient, {
	foreignKey: 'patient_id',
	sourceKey: 'id',
});

Patient.belongsTo(User, {
	foreignKey: 'patient_id',
	targetKey: 'id',
});

module.exports = Patient;
