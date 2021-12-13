const mailer = require('../nodemailer')
const { Router } = require('express')
const router = Router()

router.post('/sendCandidateMail', (req, res) => {
    if(!req.body.email) return res.sendStatus(400)
    const message = {
        to: `${req.body.email}`, // and , superAdmin@gmail.com
        subject: 'Congratulations! You are successfully registred on our site',
        text: `Ձեր դիմումն ընդունված է։ ${req.body.email}`
    }
    mailer(message)
    return res.status(200).json({message: "Candidate successfully send"})

})

module.exports = router