const { Schema, model } = require('mongoose')

const incidentSchema = new Schema(

{
  Descripcion: {type: String, require:true},
  FechaRecibo: {type: String, require:true},
  HoraRecibo: {type: String, require:true},
  NumReq: {type: String, require:true},
  NumInc: {type: String, require:true},
  AreaReporte: {type: String, require:true},
  Aplicacion: {type: String, require:true},
  Tipologia: {type: String, require:true},
  Impacto: {type: String, require:true},
  EscaladoA: {type: String, require:true},
  FechaEscalamiento: {type: String, require:true},
  HoraEscalamiento: {type: String, require:true},
  EscaladoPor: {type: String, require:true},
  RecibidoPor: {type: String, require:true},
  Estado: {type: String, require:true},
  Resolucion: {type: String},
  FechaCierre: {type: String},
  HoraCierre: {type: String}
  

},

{
timestamps: true,
versionKey: false

}



)

module.exports = model("Incident", incidentSchema)