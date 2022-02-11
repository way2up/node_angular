const {
    v4: uuidv4
} = require('uuid');
const jwt = require('jsonwebtoken');
const {
    secret,
    tokens
} = require('../config/keys').jwt;
const mongoose = require('mongoose');
const Token = require('../models/token');

const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: tokens.access.type,
    };
    const options = {
        expiresIn: tokens.access.expiresIn
    };

    return jwt.sign(payload, secret, options);
};

const generateRefrshToken = () => {
    const payload = {
        id: uuidv4(),
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