const express = require('express');
const productRoute = require('@routes/product.route');
const categoryRoute = require('@routes/category.route');
const userRoute = require('@routes/user.route');
const cartRoute = require('@routes/cart.route');

const router = express.Router();

router.use('/products', productRoute);
router.use('/categories', categoryRoute);
router.use('/users', userRoute);
router.use('/carts', cartRoute);

module.exports = router;