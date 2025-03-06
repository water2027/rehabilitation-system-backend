const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Choice = sequelize.define('choice', {
    choice_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    choices_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    display_order:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Choice;
