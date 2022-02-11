const { Router } = require('express')
const router = Router()
// const {check} = require("express-validator")
const controllerAuth = require('../controllers/authController')
const controllerVacancy = require('../controllers/setVacancyController')
const passport = require('passport');

router.post('/registration', controllerAuth.registration);
router.post('/login', controllerAuth.login);
router.get('/getUsers', passport.authenticate('jwt', { session: false}), controllerAuth.getUsers);
router.post('/setVacancy', passport.authenticate('jwt', { session: false}), controllerVacancy.setVacancy);
router.post('/updateVacancy', passport.authenticate('jwt', { session: false}), controllerVacancy.updateVacancy);
router.get('/getVacancies', passport.authenticate('jwt', { session: false}), controllerVacancy.getVacancies);
router.delete('/deleteVacancie/:id', passport.authenticate('jwt', { session: false}), controllerVacancy.deleteVacancies);


module.exports = router