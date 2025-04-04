const { DataTypes } = require('sequelize');
const sequelize = require('@config/sequelize');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    storage_capacity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    os: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'products',
    timestamps: false
});

module.exports = Product;