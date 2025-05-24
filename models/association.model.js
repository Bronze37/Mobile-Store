module.exports = ({ User, Token, Product, Category, Cart, CartItem }) => {
  // USER - TOKEN
  User.hasMany(Token, {
    foreignKey: 'user_id',
    as: 'tokens'
  });

  Token.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  // USER - CART
  User.hasOne(Cart, {
    foreignKey: 'user_id',
    as: 'cart'
  });

  Cart.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  // CATEGORY - PRODUCT
  Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products'
  });

  Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
  });

  // CART - CART_ITEM
  Cart.hasMany(CartItem, {
    foreignKey: 'cart_id',
    as: 'cartItems'
  });

  CartItem.belongsTo(Cart, {
    foreignKey: 'cart_id',
    as: 'cart'
  });

  // PRODUCT - CART_ITEM
  Product.hasMany(CartItem, {
    foreignKey: 'product_id',
    as: 'cartItems'
  });

  CartItem.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
  });
};
