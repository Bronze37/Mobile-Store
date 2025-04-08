const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('@controllers/user.controller');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/add', createUser);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;

