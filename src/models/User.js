const { Schema, model}  = require ('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema(

{
  username: {type: String, unique:true},
  password: {type: String, unique:true},
  roles: [{
    ref: "Role",
    type: Schema.Types.ObjectId
  },
 ],
},

{
timestamps: true,
versionKey: false

}



);

userSchema.statics.encryptPassword = async(password) => {
   const salt = await bcrypt.genSalt(10)
   return await bcrypt.hash(password, salt)

}
userSchema.statics.comparePassword = async(password, recievePassword) =>{
   return await bcrypt.compare(password, recievePassword)

}

module.exports = model('User',userSchema)