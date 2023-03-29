const canceladaspnCtrl = {}
const Canceladaspn = require('../models/canceladaspn')


canceladaspnCtrl.getCanceladas = async(req, res) => {
  const canceladaspn = await Canceladaspn.find().sort({createdAt:-1});
  res.json(canceladaspn)


}
canceladaspnCtrl.createCanceladas = async(req, res) => {
    const newcanceladaspn = new Canceladaspn(req.body)
    await newcanceladaspn.save()
    
    res.send ({ message: 'CanceladaSpn Registred'}) 

}
canceladaspnCtrl.getCancelada = async(req, res) => {
    const cancelada = await Canceladaspn.findById(req.params.id)
    res.send(cancelada)

}
canceladaspnCtrl.editCanceladas = async(req, res) => {
    await Canceladaspn.findByIdAndUpdate(req.params.id, req.body)
    res.send ({ status: 'CanceladaSpn Updated'})

}
canceladaspnCtrl.deleteCanceladas = async(req, res) => {
    await Canceladaspn.findByIdAndDelete(req.params.id)
   res.send ({ message: 'CanceladaSpn Deleted'})

}


module.exports = canceladaspnCtrl