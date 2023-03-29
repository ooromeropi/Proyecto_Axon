import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Incident } from '../models/incidents'
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class IncidentService{
 

  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-access-token', localStorage.getItem("token"));


  
  URL_API = 'http://localhost:4000/api/incident'
  
  selectedIncident: Incident = {

  Descripcion: '',
  FechaLlamada: '',
  FechaCorreo: '',
  NumReq: '',
  NumInc: '',
  AreaReporte: '',
  Aplicacion: '',
  Tipologia: '',
  Impacto: '',
  EscaladoA: '',
  FechaEscalamiento: '',
  EscaladoPor: '',
  RecibidoPor: '',
  Estado: '',
  Notas: '',
  Observaciones: '',
  ProductoAfectado: '',
  FechaCp: '',
  CausalNoAtencion: '',
  Falla: '',
  FechaSa: '',
  CausalRecInci: '',
  FechaDutty: '',
  Excluible: '',
  UsrCreador: '',
  UsrModifica: '',
  UsrExcluye: '',
  Resolucion: '',
  FechaCierre: '',
  SLA: '',
  Medible: '',
  Cumplimiento: ''
  }
  incidents : Incident[];

  

  constructor(public http: HttpClient){
    
  }

private findlocalStorage() {
  const token = JSON.parse(localStorage.getItem("token"))
  console.log(token)
 }

getIncidents(){
  return this.http.get<Incident[]>(this.URL_API);
  
}



createIncidents(incident: Incident){
  return this.http.post(this.URL_API,JSON.stringify(incident), {headers:this.headers})
}

deleteIncident(_id: string){
  return this.http.delete(`${this.URL_API}/${_id}`)
}

obtenerIncident(_id: string): Observable<any> {
  return this.http.get(this.URL_API + '/' +_id, {headers:this.headers});
}

editIncident(_id: string, incident: Incident): Observable<any> {
   return this.http.put(this.URL_API + '/' +_id, incident, {headers:this.headers});
}

slaIncident(_id: string, SLA): Observable<any> {
  return this.http.put(this.URL_API + '/' +_id, {SLA}, {headers:this.headers});
  
}

medibleIncident(_id: string, Medible): Observable<any> {
  return this.http.put(this.URL_API + '/' +_id, {Medible}, {headers:this.headers});
  
}


cumplSla(_id: string, Cumplimiento): Observable<any> {
  return this.http.put(this.URL_API + '/' +_id, {Cumplimiento}, {headers:this.headers});
  
}

usrExcluible(_id: string, UsrExcluye): Observable<any> {
  return this.http.put(this.URL_API + '/' +_id, {UsrExcluye}, {headers:this.headers});
  
}

usrMod(_id: string, UsrModifica): Observable<any> {
  return this.http.put(this.URL_API + '/' +_id, {UsrModifica}, {headers:this.headers});
  
}


obtenerfecPoliticas(_id: string): Observable<any> {
  return this.http.get(this.URL_API + '/' +_id, {headers:this.headers})
}


getNetUser(){
  return localStorage.getItem('username');
}

}
