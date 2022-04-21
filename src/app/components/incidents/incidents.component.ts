import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  pageActual:number=1;
  title = 'frontend';
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

  addIncident(form: NgForm){
    this.incidentService.createIncidents(form.value).subscribe(
      res => {
        this.getIncidents();
        form.reset();
      },
      err => console.log(err)

    )
  }


  deleteIncident(id: string){
    if(confirm('Seguro que desea eliminar el registro?')){
      this.incidentService.deleteIncident(id).subscribe(
        res => {
          this.getIncidents();
        },
        err => console.log(err)
      );
    }
  }


}