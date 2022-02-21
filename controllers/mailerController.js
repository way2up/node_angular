const mailer = require('../nodemailer')

class mailerController {

    async sendCandidateMail(req, res) {
        try {
            if (!req.body.email) return res.sendStatus(400)
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
            return res.status(200).json({
                message: "Candidate successfully send"
            })

        } catch (e) {
            res.status(400).json({message: e.message})
            console.log(e)
        }
    }

    async sendMailResetPassword(req, res) {
        // http://career.way2up.am in live
        // http://localhost:4200 in locale
        try {
            const url = 'http://career.way2up.am';
            if (!req.body.email) return res.sendStatus(400)
            const message = {
                to: `${req.body.email}`,
                subject: 'You can change password.',
                html: `
                <h1>You can change password with <a href="${url}/auth/reset-password?userId=${req.body.userId}">this link</a>.</h1>
                `
            }
            mailer(message)
            return res.status(200).json({
                message: "You can check your email."
            })

        } catch (e) {
            res.status(400).json({message: e.message})
            console.log(e)
        }
    }


}

module.exports = new mailerController()