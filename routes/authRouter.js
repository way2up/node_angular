const { Router } = require('express')
const router = Router()
// const {check} = require("express-validator")
const controllerAuth = require('../controllers/authController')
const controllerVacancy = require('../controllers/setVacancyController')
const passport = require('passport');
const authMiddleware = require('../middleware/auth');

router.post('/registration', controllerAuth.registration);
router.post('/login', controllerAuth.login);
router.post('/refresh-tokens', controllerAuth.refreshTokens);
router.get('/getUsers', authMiddleware, controllerAuth.getUsers);
router.post('/setVacancy', authMiddleware, controllerVacancy.setVacancy);
router.post('/updateVacancy', authMiddleware, controllerVacancy.updateVacancy);
router.get('/getVacancies', authMiddleware, controllerVacancy.getVacancies);
router.delete('/deleteVacancie/:id', authMiddleware, controllerVacancy.deleteVacancies);


module.exports = router