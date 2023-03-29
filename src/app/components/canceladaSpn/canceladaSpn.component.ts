import { Component, OnInit } from '@angular/core';
import { CanceladaSpnService } from 'src/app/services/canceladaspn.service'
import { ExporterService } from 'src/app/services/exporter.service'
import { NgForm } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe'
import { FilterPipe2 } from '../../pipes/filter.pipe2'


@Component({
  selector: 'app-canceladaSpn',
  templateUrl: './canceladaSpn.component.html',
  styleUrls: ['./canceladaSpn.component.css']
})
export class CanceladaSpnComponent implements OnInit {
  [x: string]: any;
  pageActual:number=1;
  tableSize: number = 20;
  tableSizes: any = [3, 6, 9, 12];
  title = 'frontend';
 
  constructor(public canceladaSpnService: CanceladaSpnService, 
             public exporterService: ExporterService,
             public filterPipe: FilterPipe) {
             
             this.onTableSizeChange()
             
              }
  
  filterReq = '';
  filterInc = '';
  ngOnInit(): void {
   
   
    
  }

  getCanceladas() {
    this.canceladaSpnService.getCanceladas().subscribe(
      res => {
        this.canceladaSpnService.canceladaspn= res;
        
        
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


  /*deleteCanceladaSpn(id: string){
    if(confirm('Seguro que desea eliminar el registro?')){
      this.incidentService.deleteIncident(id).subscribe(
        res => {
          this.getIncidents();
        },
        err => console.log(err)
      );
    }
  }*/

 exportAsXLSX(){
     this.exporterService.exportToExcel(this.canceladaSpnService.canceladaspn, 'cancel_spn')
   
 }
  

 onTableDataChange(event: any) {
  this.pageActual = event;
  this.getCanceladas();
} 


onTableSizeChange() {
  //this.tableSize = event.target.value;
  this.pageActual = 1;
  this.getCanceladas();
}


myFn(canceladaspn) {
  
  return 'danger';
  canceladaspn.clicked = !canceladaspn.clicked;
}

}

 


