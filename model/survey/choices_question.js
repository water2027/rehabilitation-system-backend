const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const ChoicesQuestion = sequelize.define('choices_question', {
    choices_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    question_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = ChoicesQuestion;
