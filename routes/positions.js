const { Router } = require('express')
const router = Router()
const controllerPosition = require('../controllers/positionController')
const passport = require('passport');

router.get('/getPositions', passport.authenticate('jwt', { session: false}), controllerPosition.getPositions);
router.post('/createPosition', passport.authenticate('jwt', { session: false}), controllerPosition.createPosition);
router.put('/setPosition/:id', passport.authenticate('jwt', { session: false}), controllerPosition.setPosition);
router.delete('/delPosition/:id', passport.authenticate('jwt', { session: false}), controllerPosition.delPosition);

module.exports = router