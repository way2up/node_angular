const mailer = require('../nodemailer')
const { Router } = require('express')
const router = Router()
const passport = require('passport');
const authMiddleware = require('../middleware/auth');

router.post('/sendCandidateMail', authMiddleware, (req, res) => {
    if(!req.body.email) return res.sendStatus(400)
    const message = {
        to: `${req.body.email}`, // and , superAdmin@gmail.com
        subject: 'Congratulations! You are successfully registred on our site',
        text: `Your application has been accepted. ${req.body.email}`
    }
    mailer(message)
    const message2 = {
        to: `${process.env.EMAIL_USER}`, // and , superAdmin@gmail.com
        subject: 'Dear admin you got new request from candidate .',
        text: `Dear admin you got new request from candidate .`
    }
    mailer(message2)
    return res.status(200).json({message: "Candidate successfully send"})

})


module.exports = router