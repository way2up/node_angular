const vacancy = require('../models/Vacancy');

class vacancyController {

    async getVacancies(req, res) {
        try {
            let vacancies = await vacancy.find()
                .sort({
                    startDate: -1
                });

            return res.status(200).json(vacancies)
        } catch (e) {
            console.log(e)
        }
    }

    async getActiveVacancies(req, res) {
        try {
            let vacancies = await vacancy.find({
                    show: true,
                    ...req.query
                })
                .sort({
                    startDate: -1
                }).select('-_id -__v -show');

            return res.status(200).json(vacancies)
        } catch (e) {
            console.log(e)
        }
    }

    async createVacancy(req, res) {
        try {
            const newVac = new vacancy(req.body);
            await newVac.save();
            return res.status(200).json({
                message: "New Vacancy successfully created"
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
            const position = await vacancy.findByIdAndUpdate(req.body._id, req.body, {
                new: true,
                seFindAndModify: false
            });
            return res.status(200).json({
                message: 'Vacancy successfully updated',
                data: position
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                message: 'Vacancy error'
            })
        }

    }

    // async deleteVacancies(req, res) {
    //     try {
    //         await Vacancy.findByIdAndDelete(req.params.id);
    //         res.status(200).json({
    //             message: "CV removed"
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

}

module.exports = new vacancyController()