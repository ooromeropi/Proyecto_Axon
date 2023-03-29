const { Schema, model } = require('mongoose')

const incidentSchema = new Schema(

{
  Descripcion: {type: String, require:true},
  FechaLlamada: {type: String, require:true},
  FechaCorreo: {type: String},
  NumReq: {type: String, require:true},
  NumInc: {type: String, require:true},
  AreaReporte: {type: String, require:true},
  Aplicacion: {type: String, require:true},
  Tipologia: {type: String, require:true},
  Impacto: {type: String, require:true},
  EscaladoA: {type: String, require:true},
  FechaEscalamiento: {type: String},
  EscaladoPor: {type: String, require:true},
  RecibidoPor: {type: String, require:true},
  Estado: {type: String, require:true},
  Notas: {type: String},
  Observaciones: {type: String},
  ProductoAfectado: {type: String},
  FechaCp: {type: String},
  CausalNoAtencion: {type: String},
  Falla: {type: String},
  FechaSa: {type: String},
  CausalRecInci: {type: String},
  FechaDutty: {type: String},
  Excluible: {type: String},
  UsrCreador: {type: String},
  UsrModifica: {type: String},
  UsrExcluye: {type: String},
  Resolucion: {type: String},
  FechaCierre: {type: String},
  SLA: {type: String},
  Medible: {type: String},
  Cumplimiento: {type: String}
  

},

{
timestamps: true,
versionKey: false

}



)


module.exports = model("Incident", incidentSchema)