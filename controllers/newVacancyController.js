const newVacancy = require('../models/newVacancy');
const Vacancy = require('../models/Vacancy');

class newVacancyController {

    async getNewVacancies(req, res) {
        try {
            let vacancies = await newVacancy.find()
                .sort({
                    startDate: -1
                });

            return res.status(200).json(vacancies)
        } catch (e) {
            console.log(e)
        }
    }

    async createNewVacancy(req, res) {
        try {
            // if (req.body._id) {
            //     await Vacancy.findByIdAndUpdate(req.body._id, req.body, {
            //         new: false,
            //         seFindAndModify: true
            //     });
            //     return res.status(200).json({
            //         message: "CV Updated"
            //     })
            // }
            const vacancy = new newVacancy(req.body)
            await vacancy.save()
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

    async updateNewVacancy(req, res) {
        try {
            const position = await newVacancy.findByIdAndUpdate(req.body._id, req.body, { new:true, seFindAndModify: false });
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

module.exports = new newVacancyController()