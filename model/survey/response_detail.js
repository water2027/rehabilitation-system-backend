const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const ResponseDetail = sequelize.define('response_detail', {
    detail_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    response_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    detail:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = ResponseDetail;
