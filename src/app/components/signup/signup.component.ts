import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public userService: UsersService) { }

  ngOnInit() {
    
  }
  
  addUser(form: NgForm) {
        this.userService.createUsers(form.value).subscribe(
        res => {console.log(form,res);
                form.reset();},
        err => console.log(form,err)
    )
    
  

}
  


}
