const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');
const {
    secret,
    tokens
} = require('../config/keys').jwt;
const mongoose = require('mongoose');
const Token = require('../models/token');

const generateAccessToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        // userId: user._id,
        type: tokens.access.type,
    };
    const options = {
        expiresIn: tokens.access.expiresIn
    };

    return jwt.sign(payload, secret, options);
};

const generateRefrshToken = (user) => {
    const payload = {
        id: uuid(),
        userId: user._id,
        type: tokens.refresh.type,
    };
    const options = {
        expiresIn: tokens.refresh.expiresIn
    };

    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options)
    }

};

const replaceDbRefreshToken = (tokenId, userId) =>
    Token.findOneAndRemove({
        userId
    }).exec().then(() => Token.create({
        tokenId,
        userId
    }));

module.exports = {
    generateAccessToken,
    generateRefrshToken,
    replaceDbRefreshToken
}