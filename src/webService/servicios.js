


const
    spawn = require( 'child_process' ).spawnSync,
    vbs = spawn( 'cscript.exe', [ './utilidades/Ejemplo.vbs'] );

console.log( `stderr: ${vbs.stderr.toString()}` );
console.log( `stdout: ${vbs.stdout.toString()}` );
console.log( `status: ${vbs.status}` )

