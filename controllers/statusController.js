const Status = require('../models/Status')

class statusController { 

    async getStatuses(req, res) {
        try {
            const statuses = await Status.find()
            res.status(200).json(statuses)
        } catch (e) {
            console.log(e)
        }
    }

    async createStatus(req, res) {
        try {
            const status = new Status(req.body)
            await status.save()
            return res.status(200).json({message: "Status successfully created"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Status error'})
        }
    }

    async setStatus(req, res) {
        try {
            const status = await Status.findByIdAndUpdate(req.params.id, req.body, { new:true, seFindAndModify: false });
            res.status(200).json(status)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Status error'})
        }
    }

    async delStatus(req, res) {
        try {
            await Status.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Status removed"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Status error'})
        }

    }
    
}

module.exports = new statusController()