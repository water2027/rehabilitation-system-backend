const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Lecture = sequelize.define('lecture', {
	lecture_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	doctor_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	start_date: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: true,
	},
	end_date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
});

module.exports = Lecture;
