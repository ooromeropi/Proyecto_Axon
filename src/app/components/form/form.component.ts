import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormControl, NgForm, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from '../../models/incidents'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo = 'Crear Incidente'
  _id: string | null;

  IncidentsForm = new FormGroup({
    Descripcion: new FormControl('', [Validators.required]),
    FechaLlamada: new FormControl(''),
    HoraLlamada: new FormControl(''),
    FechaCorreo: new FormControl(''),
    HoraCorreo: new FormControl(''),
    NumReq: new FormControl('', [Validators.required]),
    NumInc: new FormControl('', [Validators.required]),
    AreaReporte: new FormControl('', [Validators.required]),
    Aplicacion: new FormControl(''),
    Tipologia: new FormControl('', [Validators.required]),
    Impacto: new FormControl(''),
    EscaladoA: new FormControl(''),
    FechaEscalamiento: new FormControl(''),
    HoraEscalamiento: new FormControl(''),
    EscaladoPor: new FormControl(''),
    RecibidoPor: new FormControl(''),
    Estado: new FormControl('', [Validators.required]),
    Notas: new FormControl(''),
    Observaciones: new FormControl(''),
    ProductoAfectado: new FormControl(''),
    FechaCp: new FormControl(''),
    HoraCp: new FormControl(''),
    CausalNoAtencion: new FormControl(''),
    Falla: new FormControl(''),
    FechaSa: new FormControl(''),
    HoraSa: new FormControl(''),
    CausalRecInci: new FormControl(''),
    FechaDutty: new FormControl(''),
    HoraDutty: new FormControl(''),
    Excluible: new FormControl('NO'),
    UsrCreador: new FormControl(this.incidentService.getNetUser()),
    UsrModifica: new FormControl(this.incidentService.getNetUser()),
    Resolucion: new FormControl(''),
    FechaCierre: new FormControl(''),
    HoraCierre: new FormControl('')

  });




  constructor(public incidentService: IncidentService,
    private aRouter: ActivatedRoute,
    private router: Router,
    public userService: UsersService) {

    this._id = this.aRouter.snapshot.paramMap.get('_id');
  }


  ngOnInit(): void {
    this.isEdit();
    const token = sessionStorage.getItem('token');
    //this.getIncidents();  

  }

  getIncidents() {
    this.incidentService.getIncidents().subscribe(
      res => {
        this.incidentService.incidents = res;
      },
      err => console.log(err)
    )
  }

  addIncident(IncidentsForm) {
    if (IncidentsForm.valid == true) {
      if (this._id !== null) {
        this.incidentService.editIncident(this._id, IncidentsForm.value).subscribe(data => {
          this.router.navigate(['/incidents']);
        }, error => {
          console.log(error);
          this.IncidentsForm.reset();
        }

        )
      } else {
        this.incidentService.createIncidents(IncidentsForm.value).subscribe(
          res => {
            this.getIncidents();
            console.log('Formulario valido:', this.IncidentsForm.valid);
            IncidentsForm.reset();
            this.router.navigate(['/incidents']);

          },
          err => console.log(err)

        )
      }
    } else {
      console.log("campo obligatorio")
    }
  }

  get Descripcion() { return this.IncidentsForm.get('Descripcion');
}
  get NumReq() { return this.IncidentsForm.get('NumReq');
}
  get NumInc() { return this.IncidentsForm.get('NumInc');
}
get AreaReporte() { return this.IncidentsForm.get('AreaReporte');
}
get Tipologia() { return this.IncidentsForm.get('Tipologia');
}
get Estado() { return this.IncidentsForm.get('Estado');
}


  isEdit() {
    if (this._id !== null) {
      this.titulo = 'Editar Incidente';
      this.incidentService.obtenerIncident(this._id).subscribe(data => {
        this.IncidentsForm.setValue({
          Descripcion: data.Descripcion,
          FechaLlamada: data.FechaLlamada,
          HoraLlamada: data.HoraLlamada,
          FechaCorreo: data.FechaCorreo,
          HoraCorreo: data.HoraCorreo,
          NumReq: data.NumReq,
          NumInc: data.NumInc,
          AreaReporte: data.AreaReporte,
          Aplicacion: data.Aplicacion,
          Tipologia: data.Tipologia,
          Impacto: data.Impacto,
          EscaladoA: data.EscaladoA,
          FechaEscalamiento: data.FechaEscalamiento,
          HoraEscalamiento: data.HoraEscalamiento,
          EscaladoPor: data.EscaladoPor,
          RecibidoPor: data.RecibidoPor,
          Estado: data.Estado,
          Notas: data.Notas,
          Observaciones: data.Observaciones,
          ProductoAfectado: data.ProductoAfectado,
          FechaCp: data.FechaCp,
          HoraCp: data.HoraCp,
          CausalNoAtencion: data.CausalNoAtencion,
          Falla: data.Falla,
          FechaSa: data.FechaSa,
          HoraSa: data.HoraSa,
          CausalRecInci: data.CausalRecInci,
          FechaDutty: data.FechaDutty,
          HoraDutty: data.HoraDutty,
          Excluible: data.Excluible,
          UsrCreador: data.UsrCreador,
          UsrModifica: this.incidentService.getNetUser(),
          Resolucion: data.Resolucion,
          FechaCierre: data.FechaCierre,
          HoraCierre: data.HoraCierre
        })
      })
    }
  }



}