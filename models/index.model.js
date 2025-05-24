const User = require('./user.model');
const Token = require('../auth/token.model');
const Product = require('./product.model');
const Category = require('./category.model');
const Cart = require('./cart.model');
const CartItem = require('./cartItem.model');

const associate = require('./association.model');
associate({ User, Token, Product, Category, Cart, CartItem });

module.exports = {
  User,
  Token,
  Product,
  Category,
  Cart,
  CartItem
};
