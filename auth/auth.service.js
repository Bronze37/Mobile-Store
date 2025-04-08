const User = require('@models/user.model');

const login = async (username, password) => {
    const user = await User.findOne({ where: { username, password } });
    if (!user) {
        throw new Error('Invalid username or password');
    }
    return user;
}

const register = async (username, password) => {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        throw new Error('Username already exists');
    }
    const user = await User.create({ username, password });
    return user;
}

module.exports = { login, register };