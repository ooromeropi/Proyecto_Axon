import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { ActivatedRoute,Router } from '@angular/router';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  
  
  constructor(public userService: UsersService , 
              private aRouter: ActivatedRoute,
              public router: Router) {

                
              }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('Token'));
    console.log(this.user)
    
  }


  
  onLogout(): void{
    this.userService.logout();
  }

}
