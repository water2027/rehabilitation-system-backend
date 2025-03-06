const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Survey = sequelize.define('survey', {
    survey_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.UUID,
        allowNull: false
    },
    description:{
        type: DataTypes.DATE,
        allowNull: false
    },
    start_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Survey;
