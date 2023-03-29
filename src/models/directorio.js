const { Schema, model } = require('mongoose')

const directorioSchema = new Schema(

{
  nombre: {type: String, require:true},
  oncall: {type: String, require:true},
  ext: {type: String},
  correo: {type: String, require:true},
  bandeja: {type: String}
  


},

{
timestamps: true,
versionKey: false

}



)


module.exports = model("directorio", directorioSchema)