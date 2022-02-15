const { Router } = require('express')
const router = Router()
const controllerSkill = require('../controllers/skillController')
const passport = require('passport');
const authMiddleware = require('../middleware/auth');

router.get('/getSkills', authMiddleware, controllerSkill.getSkills);
router.post('/createSkill', authMiddleware, controllerSkill.createSkill);
router.put('/setSkill/:id', authMiddleware, controllerSkill.setSkill);
router.delete('/delSkill/:id', authMiddleware, controllerSkill.delSkill);

module.exports = router