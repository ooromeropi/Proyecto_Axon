import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserI } from '../models/user'
import { JwtResponseI } from '../models/jwt-response'
import { tap } from 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs'
import {  Router } from '@angular/router';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})

export class UsersService {

  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-access-token', localStorage.getItem("token"));  
  
URL_API = 'http://localhost:4000/api/auth/'
loginSubject = new BehaviorSubject(false);

private token: string 
private username: string
selectedUser: UserI = {

  username: '',
  password: '',
  fullname: '',
  roles: ''
   

};
users : UserI;
  





  constructor(public http: HttpClient,
              public router: Router) {}

              ngOnInit() {
                const token = sessionStorage.getItem('token');
                console.log('get token', token)
                
              }

createUsers(username: UserI){
  return this.http.post(this.URL_API + 'signup', username,{headers:this.headers})
}


login(user: UserI): Observable<JwtResponseI> {
    return this.http.post<JwtResponseI>(this.URL_API + 'signin', 
    user).pipe(tap(
      (res:JwtResponseI) => {
        if(res) {
          //guardar token
          this.saveName(user.username)
          this.saveToken(res.token)
          console.log(user.username)
          
          let userName = (user.username)
         

        }
      }
    )
    )
}


verifyLogged(): boolean {
    const token = localStorage.getItem("token");
    //si existe el token retorna true de lo contrario false
    return !! token;
}


public logout(): void {
     localStorage.removeItem("token")
     localStorage.removeItem("username")
     this.router.navigate(['/signin']);
    
}

private saveToken(token: string): void {
  localStorage.setItem("token",token);

  this.token = token;
  
}

private saveName(username: string): void {
  localStorage.setItem("username",username);

  this.username = username;
  
}


public getToken():string {
  if(!this.token) {
     this.token=localStorage.getItem("token")
  }
    return this.token
}


getUserName() {
  return this.http.get(this.URL_API)
  
  
}


}





