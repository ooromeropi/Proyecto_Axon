const authCtrl = {}
const User = require("../models/User");
const jwt = require('jsonwebtoken')
const config = require ('../config')
const Role = require("../models/Role");

authCtrl.signup = async(req, res) => {
  const {username, password, roles} = req.body;

  //const userFound = User.find({username})
  
  const newUser = new User ({
     username,
     password: await User.encryptPassword(password)

  })

if (roles) {
    const foundRoles =  await Role.find({name: {$in: roles}})
    newUser.roles = foundRoles.map(role  => role._id)
   } else {
     const role = await Role.findOne({name: "U"})
     newUser.roles = [role._id];
   }

  const savedUser = await newUser.save()

  const token = jwt.sign({id: savedUser._id},config.SECRET,{
      expiresIn: 86400 //24 horas
  })
  res.status(200).json(token)
}
authCtrl.signin = async(req, res) => {
    const userFound = await User.findOne({username: req.body.username}).populate("roles");
    
    if(!userFound) return res.status(400).json({message: "User not found"})
    
    const mathPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!mathPassword) return res.status(401).json({token: null, messaeg: 'Invalid Password'})

    const token = jwt.sign({id: userFound._id}, config.SECRET,{
       expiresIn: 86400
    })    
    res.json({token})
    
    
}

module.exports = authCtrl