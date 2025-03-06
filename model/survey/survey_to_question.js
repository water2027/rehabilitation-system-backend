const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const SurveyToQuestion = sequelize.define('survey_to_question', {
    connection_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    survey_id:{
        type: DataTypes.UUID,
        allowNull: false
    },
    question_id:{
        type: DataTypes.UUID,
        allowNull: false
    },
    display_order:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = SurveyToQuestion;