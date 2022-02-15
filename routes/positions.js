const { Router } = require('express')
const router = Router()
const controllerPosition = require('../controllers/positionController')
const passport = require('passport');
const authMiddleware = require('../middleware/auth');

router.get('/getPositions', authMiddleware, controllerPosition.getPositions);
router.post('/createPosition', authMiddleware, controllerPosition.createPosition);
router.put('/setPosition/:id', authMiddleware, controllerPosition.setPosition);
router.delete('/delPosition/:id', authMiddleware, controllerPosition.delPosition);

module.exports = router