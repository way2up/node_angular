const { Router } = require('express')
const router = Router()
const controllerSkill = require('../controllers/skillController')

router.get('/getSkills', controllerSkill.getSkills);
router.post('/createSkill', controllerSkill.createSkill);
router.put('/setSkill/:id', controllerSkill.setSkill);
router.delete('/delSkill/:id', controllerSkill.delSkill);

module.exports = router