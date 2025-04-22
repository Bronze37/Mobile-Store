require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (username, role) => {
    const payload = { username, role };
    const secretKey = process.env.JWT_SECRET

    const token = jwt.sign(payload, secretKey, { expiresIn: '30m' });
    return token;
}

const verifyToken = (token) => {
    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        }
        throw new Error('Invalid token');
    }
};

module.exports = { generateToken, verifyToken };