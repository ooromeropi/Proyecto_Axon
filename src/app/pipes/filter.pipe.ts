import { Pipe, PipeTransform } from '@angular/core';
import { IncidentsComponent } from 'src/app/components/incidents/incidents.component'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    

  

  
  transform(value: any, arg1: any): any {
    if (arg1 === '' || arg1.length < 3) return value;
    const resultReq = [];
    
    for (const req of value) {
      
        if  (req.NumReq.toLowerCase().indexOf(arg1.toLowerCase()) > -1 ||
             req.NumInc.toLowerCase().indexOf(arg1.toLowerCase()) > -1 ||
             req.Tipologia.toLowerCase().indexOf(arg1.toLowerCase()) > -1 ||
             req.Descripcion.toLowerCase().indexOf(arg1.toLowerCase()) > -1
        ) {
          resultReq.push(req);
          
          
       };
       
    };
    return resultReq;
  }

}
