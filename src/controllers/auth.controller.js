const authCtrl = {}
const User = require("../models/User");
const jwt = require('jsonwebtoken')
const config = require ('../config')
const Role = require("../models/Role");

authCtrl.signup = async(req, res) => {
  const {username, password,fullname, roles} = req.body;

  //const userFound = User.find({username})
  
  const newUser = new User ({
     username,
     password: await User.encryptPassword(password),
     fullname

  })

if (roles) {
    const foundRoles =  await Role.find({name: {$in: roles}})
    newUser.roles = foundRoles.map(role  => role._id)
   } else {
     const role = await Role.findOne({name: "U"})
     newUser.roles = [role._id];
   }

  const savedUser = await newUser.save()

  const token = jwt.sign({id: savedUser._id},config.SECRET,
                         {expiresIn: 86400})
  res.status(200).json(token)
}
authCtrl.signin = async(req, res) => {
    const userFound = await User.findOne({username: req.body.username}).populate("roles");
    
    if(!userFound) return res.status(400).json({message: "User not found"})
    
    const mathPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!mathPassword) return res.status(401).json({token: null, message: 'Invalid Password'})

    const token = jwt.sign({id: userFound._id}, config.SECRET,{
       expiresIn: 86400
    }) 
    
    const user = await User.find({username: req.body.username},{_id:0,password:0,createdAt:0,updatedAt:0})
    res.json({user,token})
    
    
    
}

authCtrl.getUser = async(req, res) => {
  const users = await User.find({},{"fullname":1,"_id":0}).sort({fullname:-1});


  res.json(users)


} 
module.exports = authCtrl

