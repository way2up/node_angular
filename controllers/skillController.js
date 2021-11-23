const Skill = require('../models/Skill')

class skillController { 

    async getSkills(req, res) {
        try {
            const skills = await Skill.find()
            res.status(200).json(skills)
        } catch (e) {
            console.log(e)
        }
    }

    async createSkill(req, res) {
        try {
            const skill = new Skill(req.body)
            await skill.save()
            return res.status(200).json({message: "Skill successfully created"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Skill error'})
        }
    }

    async setSkill(req, res) {
        try {
            const skills = await Skill.findByIdAndUpdate(req.params.id, req.body, { new:true, seFindAndModify: false });
            res.status(200).json(skills)
            // return res.status(200).json({message: "Skill successfully updated"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Skill error'})
        }
    }

    async delSkill(req, res) {
        try {
            await Skill.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Skill removed"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Skill error'})
        }

    }
    
}

module.exports = new skillController()