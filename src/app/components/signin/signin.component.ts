import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service'



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
   
  constructor(public usersService: UsersService, public router: Router) {}

  ngOnInit(): void {
  }

  onLogin(form): void {
  this.usersService.login(form.value).subscribe(res => {
    console.log(form,res)
    this.router.navigateByUrl('/home')
    .then(() => {
    window.location.reload();
  }
  )

  },
  err => alert(err.error.message)
  )
  
  }


 }

 
     
 


