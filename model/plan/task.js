const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Task = sequelize.define('task', {
    task_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Task;