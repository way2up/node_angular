const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    validationResult
} = require('express-validator')
const keys = require('../config/keys')

const authHelper = require('../helpers/authHelper')
const Token = require('../models/token');

updateTokens = async (userId) => {
    const user = await User.findOne({
        _id: userId
    })
    const accessToken = authHelper.generateAccessToken(user);
    const refreshToken = authHelper.generateRefrshToken(user);

    return authHelper.replaceDbRefreshToken(refreshToken.id, userId)
        .then(() => ({
            accessToken,
            refreshToken: refreshToken.token
        }))
}

class authController {

    async registration(req, res) {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Registration error",
                    errors
                })
            }
            const {
                fullName,
                email,
                password
            } = req.body;
            const candidate = await User.findOne({
                email
            })
            if (candidate) {
                return res.status(400).json({
                    message: "A user with the same name already exists"
                })
            }
            const hashPassword = bcrypt.hashSync(password, 10);
            const user = new User({
                fullName,
                email,
                password: hashPassword,
                role: 'Candidate'
            })
            await user.save()
            return res.json({
                message: "User successfully registered"
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Registration error'
            })
        }
    }

    async login(req, res) {
        try {
            const {
                email,
                password
            } = req.body
            const user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(400).json({
                    message: `User ${email} not found`
                })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({
                    message: `Wrong password entered`
                })
            }

            updateTokens(user._id).then(tokens => res.json({
                tokens,
                user: {
                    _id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role,
                }
            }));

        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Login error'
            })
        }
    }


    async refreshTokens(req, res) {
        const {
            refreshToken
        } = req.body;
        let payload;
        let user;

        try {
            payload = jwt.verify(refreshToken, keys.jwt.secret);
            user = await User.findOne({
                _id: payload.userId
            })
            if (payload.type !== 'refresh') {
                return res.status(400).json({
                    message: 'Invalid token!'
                });
            }
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                return res.status(400).json({
                    message: 'Token expired!'
                })
            } else if (e instanceof jwt.JsonWebTokenError) {
                return res.status(400).json({
                    message: 'Invalid token!'
                });
            }
        }

        Token.findOne({
                tokenId: payload.id
            })
            .exec().then((token) => {
                if (token === null) {
                    throw new Error('Invalid token!');
                }
                return updateTokens(token.userId);
            }).then(tokens => res.json({
                tokens,
                user
            }))
            .catch(err => res.status(400).json({
                message: err.message
            }));

    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            return res.status(200).json(users)
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }

    async checkUser(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            })

            if (user) {
                return res.status(200).json({
                    userId: user._id,
                    email: user.email,
                    message: 'success'
                })
            } else {
                return res.status(400).json({
                    message: 'The user does not exist with this email'
                })
            }

        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }

    async changeUserPassword(req, res) {
        try {
            const hashPassword = bcrypt.hashSync(req.body.new_password, 10);
            const user = await User.findOneAndUpdate({_id: req.body.userId}, {password: hashPassword});

            if (user) {
                return res.status(200).json({
                    message: 'Your password successfully updated.'
                })
            } else {
                return res.status(400).json({
                    message: 'You cannot change password.'
                })
            }

        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }

    


}

module.exports = new authController()