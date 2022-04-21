import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user'
import { JwtResponseI } from '../models/jwt-response'
import { tap } from 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
URL_API = 'http://localhost:4000/api/auth/'
loginSubject = new BehaviorSubject(false);

private token: string

selectedUser: UserI = {

  username: '',
  password: '',
  roles: ''
   

};
users : UserI;




  constructor(public http: HttpClient) {}

createUsers(username: UserI){
  return this.http.post(this.URL_API + 'signup', username)
}


login(user: UserI): Observable<JwtResponseI> {
    return this.http.post<JwtResponseI>(this.URL_API + 'signin', 
    user).pipe(tap(
      (res:JwtResponseI) => {
        if(res) {
          //guardar token
          this.saveToken(res.token)
        }
      }
    )
    )
}

logout(): void {
    this.token = '',
    localStorage.removeItem("token")
    
}

private saveToken(token: string): void {
  localStorage.setItem("token", token)
  
}

private getToken():string {
  if(!this.token) {
     this.token=localStorage.getItem("token")
  }
    return this.token
}

}




