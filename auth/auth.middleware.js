const jwt = require('jsonwebtoken');
const tokenModel = require('@models/token.model');
const userModel = require('@models/user.model');

const authorizationMiddleware = async (req, res, next) => {
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

        // Kiểm tra token trong cơ sở dữ liệu
        const tokenData = await tokenModel.findOne({
            where: { token },
            include: { model: userModel, as: 'user' },
        });

        if (!tokenData) {
            return res.status(401).json({ error: 'Unauthorized: Token not found in database' });
        }

        // Kiểm tra nếu token đã bị thu hồi
        if (tokenData.revoked) {
            return res.status(401).json({ error: 'Unauthorized: Token has been revoked' });
        }

        // Lưu thông tin người dùng vào request
        req.user = tokenData.user;
        next(); // Cho phép tiếp tục xử lý
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized: Token has expired' });
        }
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authorizationMiddleware;