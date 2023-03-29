const { Router } = require('express')
const router = Router()


const authCtrl = require('../controllers/auth.controller')
const verifySignUp = require('../middleware/verifySignUp')
const authval = require('../middleware/authJwt')



router.post('/signup', authCtrl.signup) 
router.post('/signin', authCtrl.signin)
router.get('/', authCtrl.getUser)

module.exports = router
 