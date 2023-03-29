import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe2 implements PipeTransform {
    

  
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultInc = [];
    
    for (const req of value) {
      
        if  (req.NumInc.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultInc.push(req);
       };
       
    };
    return resultInc;
  }

}
