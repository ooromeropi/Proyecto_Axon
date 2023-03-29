import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { JmeterService } from '../../services/jmeter.service'
import { FormBuilder, FormControl, NgForm, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-jmeter',
  templateUrl: './jmeter.component.html',
  styleUrls: ['./jmeter.component.css']
})
export class JmeterComponent implements OnInit {

 
  jm : string | null;

  ServiceJmiter = new FormGroup({
    jmiter: new FormControl('', [Validators.required]),
        


  });


  constructor(
    public jmeterService: JmeterService  ,
    private aRouter: ActivatedRoute,
    public router: Router) { 
    this.jm = this.aRouter.snapshot.paramMap.get('jm');                
  }

  ngOnInit(): void {
  }

  servJmeter(ServiceJmiter) {
    
    this.jmeterService.getJmeter(ServiceJmiter.value.jmiter).subscribe(
      res => {
        //this.jmeterService.getJmeter = res;
        alert(res.message)
        
      },
      err => alert(err.error.message)
    )  
  }  

  
}
