const { Router } = require('express')
const router = Router()

const serviceJmeter = require('../controllers/jmeter.controller')
const authval = require('../middleware/authJwt')



router.get('/:jm',[authval.veryfyToken, authval.isUserService], serviceJmeter.getserviceJmeter)


module.exports = router