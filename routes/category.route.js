const express = require('express');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('@controllers/category.controller');
const { authenticate, authorizeRoles } = require('@auth/auth.middleware');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/add', authenticate, authorizeRoles('admin'), createCategory);
router.patch('/update/:id', authenticate, authorizeRoles('admin'), updateCategory);
router.delete('/delete/:id', authenticate, authorizeRoles('admin'), deleteCategory);

module.exports = router;