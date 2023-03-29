const { Router } = require('express')
const router = Router()

const canceladaspnCtrl = require('../controllers/cancelaspn.controller')
const authval = require('../middleware/authJwt')





router.get('/', canceladaspnCtrl.getCanceladas)
router.post('/', [authval.veryfyToken, authval.isUser],canceladaspnCtrl.createCanceladas)
router.get('/:id', authval.veryfyToken, canceladaspnCtrl.getCancelada)
router.put('/:id', [authval.veryfyToken, authval.isUser], canceladaspnCtrl.editCanceladas)
router.delete('/:id', [authval.veryfyToken, authval.isAdmin], canceladaspnCtrl.deleteCanceladas)

module.exports = router