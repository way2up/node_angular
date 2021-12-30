const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
   {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
   },
   {
       from: 'Mailer Test <sargis.sargsyan7890@gmail.com>',
   }
);

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer