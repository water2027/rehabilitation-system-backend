const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const Auth = sequelize.define('auth', {
    auth_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    telephone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Auth