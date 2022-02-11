const { Router } = require('express')
const router = Router()
const controllerSkill = require('../controllers/skillController')
const passport = require('passport');

router.get('/getSkills', passport.authenticate('jwt', { session: false}), controllerSkill.getSkills);
router.post('/createSkill', passport.authenticate('jwt', { session: false}), controllerSkill.createSkill);
router.put('/setSkill/:id', passport.authenticate('jwt', { session: false}), controllerSkill.setSkill);
router.delete('/delSkill/:id', passport.authenticate('jwt', { session: false}), controllerSkill.delSkill);

module.exports = router