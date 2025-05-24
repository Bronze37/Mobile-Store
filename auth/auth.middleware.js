const jwt = require('jsonwebtoken');
const tokenModel = require('@auth/token.model');
const userModel = require('@models/user.model');


const authenticate = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
        }

        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);

        const tokenData = await tokenModel.findOne({
            where: { token },
            include: { model: userModel, as: 'user' },
        });

        if (!tokenData) {
            return res.status(401).json({ error: 'Unauthorized: Token not found in database' });
        }

        if (tokenData.revoked) {
            return res.status(401).json({ error: 'Unauthorized: Token has been revoked' });
        }

        req.user = tokenData.user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized: Token has expired' });
        }
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ error: 'Forbidden: No role found' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorizeRoles
};