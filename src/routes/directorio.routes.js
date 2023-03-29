const { Router } = require('express')
const router = Router()

const directorioCtrl = require('../controllers/directorio.controller')
const authval = require('../middleware/authJwt')


router.get('/', directorioCtrl.getDirectorios)
router.post('/', directorioCtrl.createDirect)
router.get('/:id', directorioCtrl.getDirectorio)
router.put('/:id', directorioCtrl.editDirect)
router.delete('/:id', directorioCtrl.deleteDirect)

module.exports = router