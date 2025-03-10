const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const User = sequelize.define('user', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV1
	},
	telephone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	level:{
		type:DataTypes.INTEGER,
		defaultValue:0,
	},
});

module.exports = User;
