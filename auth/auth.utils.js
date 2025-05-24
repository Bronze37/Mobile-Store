const jwt = require('jsonwebtoken');

const generateToken = (username, role) => {
    const payload = { username, role };
    const secretKey = process.env.JWT_SECRET

    const token = jwt.sign(payload, secretKey, { expiresIn: '30m' });
    return token;
}

module.exports = { generateToken };