import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../models/UserLogin';
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
  })
  }


 }

 
     
 


