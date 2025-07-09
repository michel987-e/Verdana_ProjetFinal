const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.auth_token;
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: err });
    }
};

module.exports = authMiddleware;