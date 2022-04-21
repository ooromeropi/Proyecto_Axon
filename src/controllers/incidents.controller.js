const incidentCtrl = {}
const Incident = require('../models/incident')


incidentCtrl.getIncidents = async(req, res) => {
  const incidents = await Incident.find()
  res.json(incidents)


}
incidentCtrl.createIncidents = async(req, res) => {
    const newIncident = new Incident(req.body)
    await newIncident.save()
    
    res.send ({ message: 'Incident Registred'}) 

}
incidentCtrl.getIncident = async(req, res) => {
    const incident = await Incident.findById(req.params.id)
    res.send(incident)

}
incidentCtrl.editIncident = async(req, res) => {
    await Incident.findByIdAndUpdate(req.params.id, req.body)
    res.send ({ status: 'Incident Updated'})

}
incidentCtrl.deleteIncident = async(req, res) => {
    await Incident.findByIdAndDelete(req.params.id)
   res.send ({ message: 'Incident Deleted'})

}


module.exports = incidentCtrl