const { Router } = require('express')
const router = Router()
const controllerStatus = require('../controllers/statusController')

router.get('/getStatuses', controllerStatus.getStatuses);
router.post('/createStatus', controllerStatus.createStatus);
router.put('/setStatus/:id', controllerStatus.setStatus);
router.delete('/delStatus/:id', controllerStatus.delStatus);

module.exports = router