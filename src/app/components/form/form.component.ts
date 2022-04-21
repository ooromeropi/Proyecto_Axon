import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { FormBuilder, FormControl, NgForm , FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  IncidentsForm = new FormGroup({
    Descripcion:new FormControl('', [Validators.required]),
    FechaRecibo:new FormControl('', [Validators.required]),
    HoraRecibo:new FormControl('', [Validators.required]),
    NumReq:new FormControl('', [Validators.required]),
    NumInc:new FormControl('', [Validators.required]),
    AreaReporte:new FormControl('', [Validators.required]),
    Aplicacion:new FormControl('',[Validators.required]),
    Tipologia:new FormControl('',[Validators.required]),
    Impacto:new FormControl('',[Validators.required]),
    EscaladoA:new FormControl(''),
    FechaEscalamiento:new FormControl(''),
    HoraEscalamiento:new FormControl(''),
    EscaladoPor:new FormControl('',[Validators.required]),
    RecibidoPor:new FormControl('',[Validators.required]),
    Estado:new FormControl('',[Validators.required]),
    Resolucion:new FormControl(''),
    FechaCierre:new FormControl(''),
    HoraCierre:new FormControl('')
    
  });
  
  constructor(public incidentService: IncidentService) { }
  

  ngOnInit(): void {
   this.getIncidents();  
    
  }

  getIncidents(){
    this.incidentService.getIncidents().subscribe(
      res => {
        this.incidentService.incidents = res;
            },
      err => console.log(err)
    )
  }

  addIncident(IncidentsForm){
    if (IncidentsForm.valid == true) {
    this.incidentService.createIncidents(IncidentsForm.value).subscribe(
      res => {
        this.getIncidents();
        console.log('Formulario valido:', this.IncidentsForm.valid);
        IncidentsForm.reset();
          
      },
      err => console.log(err)

    )
    } else {
      console.log("campo obligatorio")  
    }
  }

    
  

}