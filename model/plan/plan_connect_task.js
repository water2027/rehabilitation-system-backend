const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const PlanConnectTask = sequelize.define('plan_connect_task', {
    connect_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    plan_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    task_id:{
        type: DataTypes.UUID,
        allowNull: false
    },
    day:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = PlanConnectTask;