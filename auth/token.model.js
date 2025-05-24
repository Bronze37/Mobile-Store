const { DataTypes } = require('sequelize');
const sequelize = require('@config/sequelize');
const User = require('../models/user.model');

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
              model: User,
              key: 'id'
            },
        onDelete: 'CASCADE'
    },
    revoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'tokens',
    timestamps: false,
});

module.exports = Token;