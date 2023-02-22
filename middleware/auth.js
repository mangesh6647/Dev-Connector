const jwt = require('jsonwebtoken');
const config = require('config');

const jwtSecretToken = config.get('jwtSecret') || process.env.jwtSecret
module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    //verify token
    try {
        const decoded = jwt.verify(token, jwtSecretToken);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}