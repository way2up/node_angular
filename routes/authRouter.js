const { Router } = require('express')
// const User = require('../models/User')
const router = Router()
// const {check} = require("express-validator")
const controller = require('../controllers/authController')

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/getUsers', controller.getUsers);

module.exports = router