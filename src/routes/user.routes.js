const { Router } = require('express')
const router = Router()

const userCtrl = require('../controllers/user.controller')
const authval = require('../middleware/authJwt')
const verifySignUp = require('../middleware/verifySignUp')

router.post('/', [
    authval.veryfyToken, 
    authval.isAdmin,
    verifySignUp.checkRolesExisted
], userCtrl.createUser) 

module.exports = router;
 