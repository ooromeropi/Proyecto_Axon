const directorioCtrl = {}
const directorio = require('../models/directorio')


directorioCtrl.getDirectorios = async(req, res) => {
  const contacts = await directorio.find();
  res.json(contacts)


}
directorioCtrl.createDirect = async(req, res) => {
    const newDirec = new directorio(req.body)
    await newDirec.save()
    
    res.send ({ message: 'Contact Registred'}) 

}
directorioCtrl.getDirectorio = async(req, res) => {
    const contact = await directorio.findById(req.params.id)
    res.send(contact)

}
directorioCtrl.editDirect = async(req, res) => {
    await directorio.findByIdAndUpdate(req.params.id, req.body)
    res.send ({ status: 'Conctact Updated'})

}
directorioCtrl.deleteDirect = async(req, res) => {
    await directorio.findByIdAndDelete(req.params.id)
   res.send ({ message: 'Incident Deleted'})

}


module.exports = directorioCtrl