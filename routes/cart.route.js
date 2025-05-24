const express = require('express');
const { authenticate } = require('@auth/auth.middleware');
const { getCartByUserId, addItemToCart, updateCartItem, removeItemFromCart, clearCart } = require('@controllers/cart.controller');

const router = express.Router();

router.get('/', authenticate, getCartByUserId);
router.post('/add', authenticate, addItemToCart);
router.patch('/update', authenticate, updateCartItem);
router.delete('/delete', authenticate, removeItemFromCart);
router.delete('/clear', authenticate, clearCart);

module.exports = router;