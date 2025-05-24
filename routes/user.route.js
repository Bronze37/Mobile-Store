const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('@controllers/user.controller');
const { authenticate, authorizeRoles } = require('@auth/auth.middleware');

const router = express.Router();

router.get('/', authenticate, authorizeRoles('admin'), getAllUsers);
router.get('/:id', authenticate, authorizeRoles('admin'), getUserById);
router.post('/add', authenticate, authorizeRoles('admin'), createUser);
router.patch('/update/:id', authenticate, authorizeRoles('admin'), updateUser);
router.delete('/delete/:id', authenticate, authorizeRoles('admin'), deleteUser);

module.exports = router;

