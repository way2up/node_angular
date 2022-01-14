const Vacancy = require('../models/Vacancy')

class vacancyController { 

    async setVacancy(req, res) {
        try {
            const vacancy = new Vacancy(req.body)
            await vacancy.save()
            return res.status(200).json({message: "User successfully send request"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Vacancy error'})
        }

    }

    async updateVacancy(req, res) {
        try {
            const position = await Vacancy.findByIdAndUpdate(req.body.id, {statusId: req.body.statusId}, { new:true, seFindAndModify: false });
            res.status(200).json({message: 'Vacancy successfully updated', data: position})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Vacancy error'})
        }

    }

    async getVacancies(req, res) {
        try {
            let vacancies;
            if(req.query[`statusId`] !== 'undefined' || req.query[`email`] !== 'undefined') {
                vacancies = await Vacancy.find(req.query)
            } else {
                vacancies = await Vacancy.find()
            }
             
            res.status(200).json(vacancies)
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new vacancyController()