const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Question = sequelize.define('question', {
    question_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    question_type_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    is_required:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Question;
