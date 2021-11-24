const { Router } = require('express')
const router = Router()
const controllerPosition = require('../controllers/positionController')

router.get('/getPositions', controllerPosition.getPositions);
router.post('/createPosition', controllerPosition.createPosition);
router.put('/setPosition/:id', controllerPosition.setPosition);
router.delete('/delPosition/:id', controllerPosition.delPosition);

module.exports = router