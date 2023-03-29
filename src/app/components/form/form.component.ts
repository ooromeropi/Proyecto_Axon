import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormControl, NgForm, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo = 'Crear Incidente'
  _id: string | null;
  valfeccp: string | null;
  valTipo: string | null;
  userfullname: any;




  IncidentsForm = new FormGroup({
    Descripcion: new FormControl('', [Validators.required]),
    FechaLlamada: new FormControl(''),
    FechaCorreo: new FormControl(''),
    NumReq: new FormControl('', [Validators.required]),
    NumInc: new FormControl('', [Validators.required]),
    AreaReporte: new FormControl('', [Validators.required]),
    Aplicacion: new FormControl(''),
    Tipologia: new FormControl('', [Validators.required]),
    Impacto: new FormControl(''),
    EscaladoA: new FormControl(''),
    FechaEscalamiento: new FormControl(''),
    EscaladoPor: new FormControl(''),
    RecibidoPor: new FormControl(''),
    Estado: new FormControl('', [Validators.required]),
    Notas: new FormControl(''),
    Observaciones: new FormControl(''),
    ProductoAfectado: new FormControl(''),
    FechaCp: new FormControl(''),
    CausalNoAtencion: new FormControl(''),
    Falla: new FormControl(''),
    FechaSa: new FormControl(''),
    CausalRecInci: new FormControl(''),
    FechaDutty: new FormControl(''),
    Excluible: new FormControl(''),
    UsrCreador: new FormControl(this.incidentService.getNetUser()),
    UsrModifica: new FormControl(''),
    UsrExcluye: new FormControl(''),
    Resolucion: new FormControl(''),
    FechaCierre: new FormControl(''),
    SLA: new FormControl(''),
    Medible: new FormControl(''),
    Cumplimiento: new FormControl('No aplica')


  });
  variableDeDatos: any;
  date: Date;

  constructor(public incidentService: IncidentService,
    private aRouter: ActivatedRoute,
    private router: Router,
    public userService: UsersService,
    public datepipe: DatePipe) {


    this._id = this.aRouter.snapshot.paramMap.get('_id');
    //const fecIni = new Date(this.IncidentsForm.value.FechaCierre);
    //const fecFin = new Date(this.IncidentsForm.value.FechaCp);
       
    //this.getIncidents();
  }




  ngOnInit(): void {
    this.isEdit();
    const token = sessionStorage.getItem('token');
    this.getUserName()




  }

  getIncidents() {
    this.incidentService.getIncidents().subscribe(
      res => {
        this.incidentService.incidents = res;
      },
      err => console.log(err)
    )
  }


  getUserName() {
    this.userService.getUserName().subscribe(
      res => {
        this.userService.userForm = res;


      },
      err => console.log(err)
    )
  }




  //validacion si el incidente es nuevo o existente
  addIncident(IncidentsForm) {
    if (IncidentsForm.valid == true) {
      // si el incidente ya existe se carga la informacion de la base de datos y se realizan validacion adicionales
      if (this._id !== null) {
        //console.log(this._id)
        this.incidentService.editIncident(this._id, IncidentsForm.value).subscribe(data => {

          const fecIni = new Date(IncidentsForm.value.FechaCierre);
          const fecFin = new Date(IncidentsForm.value.FechaCp);
          const fecllam = new Date(this.IncidentsForm.value.FechaLlamada);
          const fecCorr = new Date(this.IncidentsForm.value.FechaCorreo);
          const fecEsca = new Date(this.IncidentsForm.value.FechaEscalamiento);
          const Tip = (IncidentsForm.value.Tipologia)
          const est = (IncidentsForm.value.Estado)
          const app = (IncidentsForm.value.Aplicacion)
          const usrExcl = (this.incidentService.getNetUser())
          


          if (usrExcl === "OOROMEROPI" ||
            usrExcl === "KSANCHOOI" ||
            usrExcl === "FJRODRIGUEES" ||
            usrExcl === "MACHAVEZHU" ||
            usrExcl === "AMMARTINEZBE" ||
            usrExcl === "ALVARO.ESPITIA" ||
            usrExcl === "JTORRESDI" ||
            usrExcl === "AJGONZALEZGU" ||
            usrExcl === "JWRIOSLO" ||
            usrExcl === "SCHURTADOOR"



          ) {

            this.incidentService.usrExcluible(this._id, usrExcl).subscribe(data => {
            })

          } else { console.log("sin respuest") }


          if (usrExcl === "OOROMEROPI" ||
            usrExcl === "KSANCHOOI" ||
            usrExcl === "FJRODRIGUEES" ||
            usrExcl === "MACHAVEZHU" ||
            usrExcl === "AMMARTINEZBE" ||
            usrExcl === "ALVARO.ESPITIA" ||
            usrExcl === "JTORRESDI" ||
            usrExcl === "JWRIOSLO" ||
            usrExcl === "SCHURTADOOR"


          ) {



          } else {
            this.incidentService.usrMod(this._id, usrExcl).subscribe(data => {
            })
            this.getIncidents();
          }




          if (fecFin !== null) {
            var difference = fecIni.getTime() - fecFin.getTime();


            var difference = Math.abs(fecIni.getTime() - fecFin.getTime());
            const days = (difference / (1000 * 3600 * 24))
            const minuts = (days * 24 * 60)


            function decimalAHora(decimal) {
              let horas = Math.floor(decimal), // Obtenemos la parte entera
                restoHoras = Math.floor(decimal % 1 * 100), // Obtenemos la parde decimal
                decimalMinutos = restoHoras * 60 / 100, // Obtenemos los minutos expresado en decimal


                minutos = Math.round(decimalMinutos) // Obtenemos la parte entera


              return `${('00' + horas).slice(-2)}:${('00' + minutos).slice(-2)}`;
            }

            const hours = (days * 24)
            const difhora = decimalAHora(hours)



            this.incidentService.slaIncident(this._id, difhora).subscribe(data => {
            })

            //evalua si es medible o no
            
            if (days >= 0) {
              const Medible = 'SI'
              this.incidentService.medibleIncident(this._id, Medible).subscribe(data => {


              })



              //evalua si se cumple el SLA


                
              if (est === "NO_MASIVO_NIVEL_2" || est === "CRITICO") {
                if (hours <= 4) {
                  const Cumplimiento = "Cumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                } else {
                  const Cumplimiento = "Incumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                }

              }

              if (est === "ALARMA" && Tip === "ALARMA_SPN") {
                if (minuts <= 20) {
                  const Cumplimiento = "Cumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                }
                else {
                  const Cumplimiento = "Incumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                }

              }

              if (est === "ALARMA" && !(Tip === "ALARMA_SPN")) {
                if (hours <= 2) {
                  const Cumplimiento = "Cumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                }
                else {
                  const Cumplimiento = "Incumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                }

              }


              if (est === "MASIVO") {
                if (minuts <= 20) {
                  const Cumplimiento = "Cumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                } else {
                  const Cumplimiento = "Incumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                }

              }

              if (est === "RECHAZADO") {
                if (minuts <= 30) {
                  const Cumplimiento = "Cumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                } else {
                  const Cumplimiento = "Incumple"
                  this.incidentService.cumplSla(this._id, Cumplimiento).subscribe(data => {

                  })
                }

              }



            }
            
          }
          

          this.router.navigate(['/incidents']);
          this.getIncidents();
          
        },

        

          err => {
            alert(err.error.message);
            this.IncidentsForm.reset();
          }
             

        )
      } else {
        this.incidentService.createIncidents(IncidentsForm.value).subscribe(
          res => {
            this.getIncidents();
            console.log('Formulario valido:', this.IncidentsForm.valid);

            const fecIni = new Date(IncidentsForm.value.FechaCierre);
            const fecFin = new Date(IncidentsForm.value.FechaCp);
            const fecllam = new Date(this.IncidentsForm.value.FechaLlamada);
            const fecCorr = new Date(this.IncidentsForm.value.FechaCorreo);
            const fecEsca = new Date(this.IncidentsForm.value.FechaEscalamiento);
            const Tip = (IncidentsForm.value.Tipologia)
            const est = (IncidentsForm.value.Estado)
            const app = (IncidentsForm.value.Aplicacion)
            const usrExcl = (this.incidentService.getNetUser())
            

            IncidentsForm.reset();



            this.router.navigate(['/incidents']);

          },
          err => alert(err.error.message)

        )
      }
    } else {
      alert("campo obligatorio")
    }
  }


  get Descripcion() {
    return this.IncidentsForm.get('Descripcion');
  }
  get NumReq() {
    return this.IncidentsForm.get('NumReq');
  }
  get NumInc() {
    return this.IncidentsForm.get('NumInc');
  }
  get AreaReporte() {
    return this.IncidentsForm.get('AreaReporte');

  }
  get Tipologia() {
    return this.IncidentsForm.get('Tipologia');
  }

  get Estado() {
    return this.IncidentsForm.get('Estado');
  }

  get FechaCp() {
    return this.IncidentsForm.get('FechaCp');


  }



  get feccplanOs() {
    const valfccp = this.IncidentsForm.value.FechaCp
    if (valfccp.length) {
      this.valfeccp = 'trueVal'
    }
    else {
      this.valfeccp = 'falseVal'
    }

    return this.valfeccp
  }

  get TipVal() {
    const valTip = this.IncidentsForm.value.Tipologia
    this.valTipo = valTip

    return this.valTipo;
  }



  isEdit() {
    if (this._id !== null) {
      this.titulo = 'Editar Incidente';
      this.incidentService.obtenerIncident(this._id).subscribe(data => {
        this.IncidentsForm.setValue({
          Descripcion: data.Descripcion,
          FechaLlamada: data.FechaLlamada,
          FechaCorreo: data.FechaCorreo,
          NumReq: data.NumReq,
          NumInc: data.NumInc,
          AreaReporte: data.AreaReporte,
          Aplicacion: data.Aplicacion,
          Tipologia: data.Tipologia,
          Impacto: data.Impacto,
          EscaladoA: data.EscaladoA,
          FechaEscalamiento: data.FechaEscalamiento,
          EscaladoPor: data.EscaladoPor,
          RecibidoPor: data.RecibidoPor,
          Estado: data.Estado,
          Notas: data.Notas,
          Observaciones: data.Observaciones,
          ProductoAfectado: data.ProductoAfectado,
          FechaCp: data.FechaCp,
          CausalNoAtencion: data.CausalNoAtencion,
          Falla: data.Falla,
          FechaSa: data.FechaSa,
          CausalRecInci: data.CausalRecInci,
          FechaDutty: data.FechaDutty,
          Excluible: data.Excluible,
          UsrCreador: data.UsrCreador,
          UsrModifica: data.UsrModifica,
          UsrExcluye: data.UsrExcluye,
          Resolucion: data.Resolucion,
          FechaCierre: data.FechaCierre,
          SLA: data.SLA,
          Medible: data.Medible,
          Cumplimiento: data.Cumplimiento
        })
      })
    }
  }



}


