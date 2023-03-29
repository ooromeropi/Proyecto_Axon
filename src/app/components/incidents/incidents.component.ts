import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service'
import { ExporterService } from 'src/app/services/exporter.service'
import { NgForm } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe'
import { FilterPipe2 } from '../../pipes/filter.pipe2'


@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  [x: string]: any;
  pageActual:number=1;
  tableSize: number = 20;
  tableSizes: any = [3, 6, 9, 12];
  title = 'frontend';
 
  constructor(public incidentService: IncidentService, 
             public exporterService: ExporterService,
             public filterPipe: FilterPipe
             ) {
             
             this.onTableSizeChange()
             
              }
  
  filterReq = '';
  filterInc = '';
  ngOnInit(): void {
   
   
    
  }

  getIncidents() {
    this.incidentService.getIncidents().subscribe(
      res => {
        this.incidentService.incidents = res;
        
        
      },
      err => console.log(err)
    )
  }

  /*addIncident(form: NgForm){
    this.incidentService.createIncidents(form.value).subscribe(
      res => {
        this.getIncidents();
        form.reset();
      },
      err => console.log(err)

    )
  }*/


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

 exportAsXLSX(){
     this.exporterService.exportToExcel(this.incidentService.incidents, 'inc_70429')
   
 }
  

 onTableDataChange(event: any) {
  this.pageActual = event;
  this.getIncidents();
} 


onTableSizeChange() {
  //this.tableSize = event.target.value;
  this.pageActual = 1;
  this.getIncidents();
}


myFn(incident) {
  
  return 'danger';
  incident.clicked = !incident.clicked;
}

}

 


