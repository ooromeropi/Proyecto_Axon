import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Contacto } from '../models/contactos'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  URL_API = 'http://localhost:4000/api/contact/'
             


  selectedContact: Contacto = {

    nombre: '',
    oncall: '',
    ext: '',
    correo: '',
    bandeja: ''

    }
    contacto : Contacto[];

  constructor(public http: HttpClient) {


   }
   getDirectorios(){
    return this.http.get<Contacto[]>(this.URL_API);
    
  }
  }



