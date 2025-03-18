const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');
const User = require('../user/user');

const Admin = sequelize.define('auth', {
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

User.hasOne(Admin, {
	foreignKey: 'auth_id',
	sourceKey: 'id',
});

Admin.belongsTo(User, {
	foreignKey: 'auth_id',
	targetKey: 'id',
});

module.exports = Admin;
