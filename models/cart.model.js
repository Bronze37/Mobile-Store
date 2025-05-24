const { DataTypes } = require('sequelize');
const sequelize = require('@config/sequelize');
const User = require('./user.model');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,references: {
              model: User,
              key: 'id'
            },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'carts',
    timestamps: false
});

module.exports = Cart;