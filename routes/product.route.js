const express = require('express');
const { getProductsByFilters, getProductById, addProduct, updateProduct, deleteProduct } = require('@controllers/product.controller');
const { authenticate, authorizeRoles} = require('@auth/auth.middleware');

const router = express.Router();

router.get('/', getProductsByFilters);
router.get('/:id', getProductById);
router.post('/add', authenticate, authorizeRoles('admin'), addProduct);
router.patch('/update/:id', authenticate, authorizeRoles('admin'), updateProduct)
router.delete('/delete/:id', authenticate, authorizeRoles('admin'), deleteProduct);

module.exports = router;