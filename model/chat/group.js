const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Group = sequelize.define('group', {
    group_id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    group_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    group_description: {
        type: DataTypes.STRING,
    },
    group_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});



module.exports = Group;