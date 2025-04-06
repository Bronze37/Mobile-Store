const express = require('express');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('@controllers/category.controller');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/add', createCategory);
router.patch('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;