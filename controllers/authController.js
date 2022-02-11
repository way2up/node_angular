const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    validationResult
} = require('express-validator')
const keys = require('../config/keys')
const authHelper = require('../helpers/authHelper')
const Token = require('../models/token');


class authController {

    updateTokens = (userId) => {
        const accessToken = authHelper.generateAccessToken(userId);
        const refreshToken = authHelper.generateRefrshToken();

        return authHelper.replaceDbRefreshToken(refreshToken.id, userId)
            .then(() => ({
                accessToken,
                refreshToken: refreshToken.token
            }))
    }

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

            this.updateTokens(user._id).then(tokens => res.json(tokens));

            // const token = jwt.sign({
            //     email: user.email,
            //     fullName: user.fullName,
            //     userId: user._id,
            // }, keys.jwt.secret , {expiresIn: "4h"})
            // return res.status(200).json({token: `Bearer ${token}`,user})
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Login error'
            })
        }
    }


    async refreshTokens(req, res) {
        const { refreshToken } = req.body;
        let payload;

        try {
            payload = jwt.verify(refreshToken, secret);
            if ( payload.type !== 'refresh') {
                return res.status(400).json({message: 'Invalid token!'});
            }
        } catch (e) {
            if ( e instanceof jwt.TokenExpiredError) {
                return res.status(400).json({ message: 'Token expired!' })
            } else if ( e instanceof jwt.JsonWebTokenError) {
                return res.status(400).json({ message: 'Invalid token!' });
            }

        }

    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()