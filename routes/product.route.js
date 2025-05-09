const express = require('express');
const { getProductsByFilters, getProductById, addProduct, updateProduct, deleteProduct, filterProducts } = require('@controllers/product.controller');

const router = express.Router();

router.get('/', getProductsByFilters);
router.get('/:id', getProductById);
router.post('/add', addProduct);
router.patch('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct);

module.exports = router;