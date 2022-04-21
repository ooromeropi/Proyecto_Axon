const verifySignUp = {}
const ROLES = ["U", "A", "I"]
//console.log(ROLES)
const User = require('../models/User')

verifySignUp.checkDuplicateUsername = async (req, res, next) => {
  const user = await User.findOne({username: req.body.username})

  if (user) return res.status(400).json({message: 'The user alreay exists'})
  
  next()
}



verifySignUp.checkRolesExisted = (req, res, next) => {
   if (req.body.roles) {
    
       for (let i = 0; i < req.body.roles.length; i++) {
          if(!ROLES.includes(req.body.roles[i])) {
            return res.status(400).json({
                 message: `Role ${req.body.roles[i]} does not exists`
            })  
       }
   }
}
   next();
}

module.exports = verifySignUp
