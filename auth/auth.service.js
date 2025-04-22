const User = require('@models/user.model');
const Token = require('@models/token.model');
const { generateToken } = require('@auth/auth.utils');

const login = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('User not found');

    if (user.password !== password) throw new Error('Invalid password');

    const token = generateToken(user.username, user.role);

    Token.create({
        token,
        user_id: user.id,
    }).catch((error) => {
        throw new Error('Error creating token: ' + error.message);
    })

    return token;
}

const register = async (username, password) => {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        throw new Error('Username already exists');
    }
    const user = await User.create({ username, password });
    return user;
}

const logout = async (token) => { 
    const tokenRecord = await Token.findOne({ where: { token } });
    if (!tokenRecord) {
        throw new Error('Token not found');
    }
    await Token.update({revoked: "true"}, { where: { token } })
    return true;
}

module.exports = { login, register, logout };