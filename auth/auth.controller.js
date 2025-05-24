const authService = require('./auth.service');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        await authService.logout(token);
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

module.exports = { login, register, logout };