const jwt = require('jsonwebtoken')
const keys = require('../config/keys');
const User = require('../models/User');

module.exports = (req, res, next) => {
    let token;
    
    const authHeader = req.get('Authorization');

    if (!authHeader && req.get('remember')) {
        res.status(401).json({
            message: 'Token not provided!'
        });
        return;
    }

    if (authHeader) {
         token = authHeader.replace('Bearer ', '');
    }
    
    try {
        if(authHeader) {
            const payload = jwt.verify(token, keys.jwt.secret);
            if (payload.type !== "access" && req.get('remember')) {
                res.status(401).json({
                    message: 'Invalid Token!'
                });
                return;
            }
        }

    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {

            if (req.get('remember') === 'false') {
                return res.status(401).json({
                    message: 'Token expired!'
                });
            } else if(req.get('remember') === 'true') {
                res.status(401).json({
                    message: 'new Token'
                });
                next();
                
            }
        }
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Invalid Token!'
            });
        }
    }

    next();
}