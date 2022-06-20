const { Router } = require('express')
const router = Router()
const controllerVacancy = require('../controllers/candidateController')
// const passport = require('passport');
const authMiddleware = require('../middleware/auth');

router.post('/setCandidate', authMiddleware, controllerVacancy.setCandidate);
router.post('/updateCandidate', authMiddleware, controllerVacancy.updateCandidate);
router.get('/getCandidates', authMiddleware, controllerVacancy.getCandidates);
router.delete('/deleteCandidate/:id', authMiddleware, controllerVacancy.deleteCandidates);

module.exports = router