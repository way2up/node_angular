const { Router } = require('express')
const router = Router()
const controllerStatus = require('../controllers/statusController')
const passport = require('passport');

// 
router.get('/getStatuses', passport.authenticate('jwt', { session: false}), controllerStatus.getStatuses);
router.post('/createStatus', passport.authenticate('jwt', { session: false}), controllerStatus.createStatus);
router.put('/setStatus/:id', passport.authenticate('jwt', { session: false}), controllerStatus.setStatus);
router.delete('/delStatus/:id', passport.authenticate('jwt', { session: false}), controllerStatus.delStatus);

module.exports = router