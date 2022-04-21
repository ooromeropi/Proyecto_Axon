const { Router } = require('express')
const router = Router()


const authCtrl = require('../controllers/auth.controller')
const verifySignUp = require('../middleware/verifySignUp')



router.post('/signup',[verifySignUp.checkDuplicateUsername,verifySignUp.checkRolesExisted], authCtrl.signup) 
router.post('/signin', authCtrl.signin)

module.exports = router
 