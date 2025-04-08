const express = require('express');
const productRoute = require('@routes/product.route');
const categoryRoute = require('@routes/category.route');
const userRoute = require('@routes/user.route');

const router = express.Router();

router.use('/products', productRoute);
router.use('/categories', categoryRoute);
router.use('/users', userRoute);

module.exports = router;