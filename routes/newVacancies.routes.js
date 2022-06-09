const { Router } = require('express')
const router = Router()
const controllerAuth = require('../controllers/authController')
const controllerNewVacancy = require('../controllers/newVacancyController')
const authMiddleware = require('../middleware/auth');

router.get('/getNewVacancies', authMiddleware, controllerNewVacancy.getNewVacancies);
router.post('/createNewVacancy', authMiddleware, controllerNewVacancy.createNewVacancy);
router.post('/updateNewVacancy', authMiddleware, controllerNewVacancy.updateNewVacancy);

module.exports = router