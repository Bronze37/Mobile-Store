const sequelize = require('@config/sequelize');
const { DataTypes } = require('sequelize');
const Token = require('@models/token.model');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
}, {
    tableName: 'users',
    timestamps: false
});

User.hasMany(Token, {
    foreignKey: 'user_id',
    as: 'tokens' 
});

Token.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = User;
