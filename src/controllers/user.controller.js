const userCtrl = {}
const jwt = require('jsonwebtoken')
userCtrl.createUser = (req, res) => {
   res.json('creating user')

}

module.exports = userCtrl