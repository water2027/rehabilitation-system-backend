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
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    allergicHistory:{
        type: DataTypes.STRING,
        defaultValue:"",
        allowNull: false,
    },
    illnessHistory:{
        type: DataTypes.STRING,
        defaultValue:"",
        allowNull: false,
    },
    remark:{
        type: DataTypes.STRING,
        defaultValue:"",
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
