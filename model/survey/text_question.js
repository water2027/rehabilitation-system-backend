const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const TextQuestion = sequelize.define('text_question', {
    text_id: {
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

module.exports = TextQuestion;
