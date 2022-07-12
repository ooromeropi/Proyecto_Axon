
const { Schema, model } = require('mongoose')



const roleSchema = new Schema(

{
  name: String
  },

{
  timestamps: true,
  versionKey: false

});

module.exports = model('Role', roleSchema)
