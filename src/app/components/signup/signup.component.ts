import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  roless: string[];

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    roles: new FormControl('', [Validators.required])
    


  });
  
  constructor(public userService: UsersService) { 
    this.roless = ['U','A','S','I']
  }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    console.log('get token', token)
  }

  
  

  addUser(userForm) {
    console.log(userForm.value.roles)
        this.userService.createUsers(userForm.value).subscribe(
        res => {console.log(userForm,res);
          userForm.reset();},
        err => console.log(userForm,err)
    )
    
  

}
  


}
