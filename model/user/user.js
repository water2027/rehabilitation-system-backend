const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const User = sequelize.define('user', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	telephone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
});

module.exports = User;
