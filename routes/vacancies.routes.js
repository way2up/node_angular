const { Router } = require('express')
const router = Router()
const controllerAuth = require('../controllers/authController')
const controllerVacancy = require('../controllers/vacancyController')
const authMiddleware = require('../middleware/auth');

router.get('/getVacancies', authMiddleware, controllerVacancy.getVacancies);
router.get('/getActiveVacancies', controllerVacancy.getActiveVacancies);
router.post('/createVacancy', authMiddleware, controllerVacancy.createVacancy);
router.post('/updateVacancy', authMiddleware, controllerVacancy.updateVacancy);

module.exports = router