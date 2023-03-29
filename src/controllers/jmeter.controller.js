const serviceJmeter = {}





serviceJmeter.getserviceJmeter = async (req, res) => {
    
    var proceso= req.params.jm

    const
        
        spawn = await require('child_process').spawn,
        vbs = spawn('cscript.exe', ['./utilidades/pruebaJmeter.vbs',proceso]);
        

    console.log(`stderr: ${vbs.stderr.toString()}`);
    console.log(`stdout: ${vbs.stdout.toString()}`);
    console.log(`status: ${vbs.status}`)

    res.json({ message: 'Servicio en Ejecucion, verificar el log en la ruta Output_Hist del servidor 10.203.222.182'})
    



}


module.exports = serviceJmeter