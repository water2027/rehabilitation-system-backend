const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');
const User = require('../user/user');

const Auth = sequelize.define('auth', {
	auth_id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	auth_status: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

User.hasOne(Auth, {
	foreignKey: 'auth_id',
	sourceKey: 'id',
});

Auth.belongsTo(User, {
	foreignKey: 'auth_id',
	targetKey: 'id',
});

module.exports = Auth;
