const authval = {}
const jwt = require('jsonwebtoken')
const config = require('../config');
const User = require('../models/User');
const Role = require('../models/Role');

authval.veryfyToken = async (req, res , next) => {
  
  try {
    
    const token = req.headers["x-access-token"];
  
  //console.log(token)
  
  if (!token) return res.status(403).json({message: "No token provided"})
  
  const decoded = jwt.verify(token,config.SECRET)
  req.userId = decoded.id
  console.log(token)
  const user = await User.findById(req.userId, {password: 0})
  //console.log(user)
  if (!user) return res.status(404).json({message: "no user found"})

  next()

  } catch (error) {
     return res.status(401).json({message: 'Unautorized'})
  }
  
 
}



authval.isUser = async (req, res , next) => {
 
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})
  
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "U") {
      next()
      return;
    }
    
  }
  return res.status(403).json({message: "Requiere roles de usuario"})
  
  
}


authval.isAdmin = async (req, res , next) => {
 
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})
  
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "A") {
      next()
      return;
    }
    
  }
  return res.status(403).json({message: "Requiere roles de Admin"})
  
  
}

authval.isInvited = async (req, res , next) => {
 
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})
  
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "I") {
      next()
      return;
    }
    
  }
  return res.status(403).json({message: "Requiere roles de invitado"})
  
  
}

module.exports = authval
