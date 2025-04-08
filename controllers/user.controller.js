const userService = require('@services/user.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const user = await userService.createUser(userData);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const user = await userService.updateUser(id, userData);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.deleteUser(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };