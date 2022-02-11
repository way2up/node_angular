const mailer = require('../nodemailer')
const { Router } = require('express')
const router = Router()
const passport = require('passport');

router.post('/sendCandidateMail', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(!req.body.email) return res.sendStatus(400)
    const message = {
        to: `${req.body.email}`, // and , superAdmin@gmail.com
        subject: 'Congratulations! You are successfully registred on our site',
        text: `Your application has been accepted. ${req.body.email}`
    }
    mailer(message)
    return res.status(200).json({message: "Candidate successfully send"})

})

module.exports = router