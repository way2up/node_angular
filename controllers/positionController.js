const Position = require('../models/Position')

class positionController { 

    async getPositions(req, res) {
        try {
            const positions = await Position.find()
            res.status(200).json(positions)
        } catch (e) {
            console.log(e)
        }
    }

    async createPosition(req, res) {
        try {
            const positions = new Position(req.body)
            await positions.save()
            return res.status(200).json({message: "Position successfully created"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Position error'})
        }
    }

    async setPosition(req, res) {
        try {
            const position = await Position.findByIdAndUpdate(req.params.id, req.body, { new:true, seFindAndModify: false });
            res.status(200).json(position)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Position error'})
        }
    }

    async delPosition(req, res) {
        try {
            await Position.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Position removed"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Position error'})
        }
    }
    
}

module.exports = new positionController()