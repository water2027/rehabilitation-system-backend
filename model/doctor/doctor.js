const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');
const User = require('../user/user');

const Doctor = sequelize.define('doctor', {
	doctor_id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	gender: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	position: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	workingExperience: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	professionalExperience: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	introduction: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	auth_status: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

User.hasOne(Doctor, {
	foreignKey: 'doctor_id',
	sourceKey: 'id',
});

Doctor.belongsTo(User, {
	foreignKey: 'doctor_id',
	targetKey: 'id',
});

module.exports = Doctor;
