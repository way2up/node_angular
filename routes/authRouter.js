const { Router } = require('express')
// const User = require('../models/User')
const router = Router()
// const {check} = require("express-validator")
const controllerAuth = require('../controllers/authController')
const controllerVacancy = require('../controllers/setVacancyController')

router.post('/registration', controllerAuth.registration);
router.post('/login', controllerAuth.login);
router.get('/getUsers', controllerAuth.getUsers);
router.post('/setVacancy', controllerVacancy.setVacancy);

// vacancy   --- reqVacancies

module.exports = router