const { Router } = require('express')
const router = Router()
// const {check} = require("express-validator")
const controllerAuth = require('../controllers/authController')
const passport = require('passport');
const authMiddleware = require('../middleware/auth');

router.post('/registration', controllerAuth.registration);
router.post('/login', controllerAuth.login);
router.post('/refresh-tokens', controllerAuth.refreshTokens);
router.get('/getUsers', authMiddleware, controllerAuth.getUsers);
router.post('/checkUser', controllerAuth.checkUser);
router.post('/changeUserPassword', controllerAuth.changeUserPassword);

module.exports = router