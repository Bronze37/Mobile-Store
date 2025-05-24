const User = require('@models/user.model');

const getAllUsers = async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'role'],
        });
        return users;
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id, {
            attributes: ['id', 'username', 'role'],
        });
        return user;
    } catch (error) {
        throw error;
    }
}

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return {
            id: user.id,
            username: user.username,
            role: user.role,
        }
    } catch (error) {
        throw error;
    }
}

const updateUser = async (id, userData) => {
    try {
        if (userData.password) {
            throw new Error('Password update is not allowed in this method');
        }

        if (userData.username) {
            throw new Error('Username update is not allowed in this method');
        }

        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }

        await user.update(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };