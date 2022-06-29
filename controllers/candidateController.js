const Candidate = require('../models/Candidate')

class candidateController {

    async setCandidate(req, res) {
        try {
            if (req.body._id) {
                await Candidate.findByIdAndUpdate(req.body._id, req.body, {
                    new: false,
                    seFindAndModify: true
                });
                return res.status(200).json({
                    message: "Successfully Updated"
                })
            }
            const candidate = new Candidate(req.body)
            await candidate.save()
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

    async updateCandidate(req, res) {
        try {
            const position = await Candidate.findByIdAndUpdate(req.body.id, {
                statusId: req.body.statusId
            }, {
                new: true,
                seFindAndModify: false
            });
            res.status(200).json({
                message: 'Candidate successfully updated',
                data: position
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Candidate error'
            })
        }

    }

    async getCandidates(req, res) {
        try {
            let candidates;
            if (req.query[`statusId`] || req.query[`user_id`] || req.query[`_id`]) {
                candidates = await Candidate.find(req.query).sort({
                    date: -1
                })
            } else {
                candidates = await Candidate.find().sort({
                    date: -1
                })
            }

            // vacancies = vacancies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            return res.status(200).json(candidates)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteCandidates(req, res) {
        try {
            await Candidate.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "CV removed"
            })
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new candidateController()