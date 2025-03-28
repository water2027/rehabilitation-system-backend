const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Group = require('./group');
const User = require('../user/user');

const GroupMember = sequelize.define('group_member', {
    group_member_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    group_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

GroupMember.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
});

Group.hasMany(GroupMember, {
    foreignKey: 'group_id',
    sourceKey: 'group_id',
});

GroupMember.belongsTo(Group, {
    foreignKey: 'group_id',
    targetKey: 'group_id',
});

module.exports = GroupMember;