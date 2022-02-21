
const { Router } = require('express')
const router = Router()
const passport = require('passport');
const authMiddleware = require('../middleware/auth');
const mailerController = require('../controllers/mailerController');

router.post('/sendCandidateMail', authMiddleware, mailerController.sendCandidateMail)
router.post('/sendMailResetPassword', authMiddleware, mailerController.sendMailResetPassword)

module.exports = router