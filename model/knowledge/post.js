const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Post = sequelize.define('post', {
	post_id: {
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
	content: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: true,
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
});

module.exports = Post;
