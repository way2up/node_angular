const Vacancy = require('../models/Vacancy')

class vacancyController {

    async setVacancy(req, res) {
        try {
            if (req.body._id) {
                await Vacancy.findByIdAndUpdate(req.body._id, req.body, {
                    new: false,
                    seFindAndModify: true
                });
                return res.status(200).json({
                    message: "CV Updated"
                })
            }
            const vacancy = new Vacancy(req.body)
            await vacancy.save()
            return res.status(200).json({
                message: "CV successfully sent"
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: e.message
            })
        }

    }

    async updateVacancy(req, res) {
        try {
            const position = await Vacancy.findByIdAndUpdate(req.body.id, {
                statusId: req.body.statusId
            }, {
                new: true,
                seFindAndModify: false
            });
            res.status(200).json({
                message: 'Vacancy successfully updated',
                data: position
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Vacancy error'
            })
        }

    }

    async getVacancies(req, res) {
        try {
            let vacancies;
            if (req.query[`statusId`] || req.query[`user_id`] || req.query[`_id`]) {
                vacancies = await Vacancy.find(req.query).sort({
                    date: -1
                })
            } else {
                vacancies = await Vacancy.find().sort({
                    date: -1
                })
            }

            // vacancies = vacancies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            return res.status(200).json(vacancies)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteVacancies(req, res) {
        try {
            await Vacancy.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "CV removed"
            })
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new vacancyController()