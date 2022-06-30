import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    

  
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultReq = [];
    
    for (const req of value) {
      
        if  (req.NumReq.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultReq.push(req);
       };
       
    };
    return resultReq;
  }

}
