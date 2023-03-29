const { Schema, model } = require('mongoose')

const cancelspnSchema = new Schema(

{
  Numero_Portado: {type: String, require:true},
  Tipo_Negocio: {type: String, require:true},
  Linea_Nativa: {type: String},
  FVC: {type: String, require:true},
  Estado_spn: {type: String, require:true},
  Estado_Orden: {type: String, require:true},
  Motivo_Cancelacion: {type: String, require:true},
  Gestion_Canceladas: {type: String, require:true},
  UsrCreador: {type: String},
  UsrModifica: {type: String},
  Observacion: {type: String, require:true}
  

},

{
timestamps : true,
get: time => time.toDateString(),
versionKey: false

}



)


module.exports = model("CancelSpn", cancelspnSchema)