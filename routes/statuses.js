const { Router } = require('express')
const router = Router()
const controllerStatus = require('../controllers/statusController')
const passport = require('passport');
const authMiddleware = require('../middleware/auth');

// passport.authenticate('jwt', { session: false})
router.get('/getStatuses', authMiddleware, controllerStatus.getStatuses);
router.post('/createStatus', authMiddleware, controllerStatus.createStatus);
router.put('/setStatus/:id', authMiddleware, controllerStatus.setStatus);
router.delete('/delStatus/:id', authMiddleware, controllerStatus.delStatus);

module.exports = router