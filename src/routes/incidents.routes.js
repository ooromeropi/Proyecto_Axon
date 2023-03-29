const { Router } = require('express')
const router = Router()

const incidentsCtrl = require('../controllers/incidents.controller')
const authval = require('../middleware/authJwt')





router.get('/', incidentsCtrl.getIncidents)
router.post('/', [authval.veryfyToken, authval.isUser],incidentsCtrl.createIncidents)
router.get('/:id', authval.veryfyToken, incidentsCtrl.getIncident)
router.put('/:id', [authval.veryfyToken, authval.isUser], incidentsCtrl.editIncident)
router.delete('/:id', [authval.veryfyToken, authval.isAdmin], incidentsCtrl.deleteIncident)

module.exports = router