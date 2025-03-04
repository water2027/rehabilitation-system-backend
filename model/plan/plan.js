const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Plan = sequelize.define('plan', {
    plan_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    doctor_id: {
        type: DataTypes.UUID,
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
});

module.exports = Plan;
