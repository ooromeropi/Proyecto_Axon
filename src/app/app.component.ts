import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  IsAuthenticated = false;
  title='Axon'
  myimage:string = "assets/images/logotelefonica2.png"; 
  
  constructor(public userService: UsersService , public router: Router) {}

  onLogout(): void{
    this.userService.logout()
    window.location.reload();
   
  }
}

