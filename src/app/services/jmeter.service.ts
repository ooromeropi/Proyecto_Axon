import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JmeterService {

  
  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-access-token', localStorage.getItem("token"));

  URL_API = 'http://localhost:4000/api/serviceJmeter'

  constructor(public http: HttpClient) { 
    
  }

  getJmeter(jm:string): Observable<any> {
    return this.http.get(this.URL_API + '/' + jm,{headers:this.headers})
    
    
    
  }
}

