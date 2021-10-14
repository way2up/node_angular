const Vacancy = require('../models/Vacancy')

class vacancyController { 

    async setVacancy(req, res) {
        try {
            const vacancy = new Vacancy(req.body)
            await vacancy.save()
            return res.json({message: "User successfully send request"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Vacancy error'})
        }

    }

}

module.exports = new vacancyController()