import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Incident } from '../models/incidents'




@Injectable({
  providedIn: 'root'
})
export class IncidentService{

  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-access-token', localStorage.getItem("token"));
  //.set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWI5M2M2YmEyZTQ0N2Y1OTYyMTcyOSIsImlhdCI6MTY1MDE3MjIwMSwiZXhwIjoxNjUwMjU4NjAxfQ.g-nWV7CC-OWyl1YbQU2Mvgn9Qroy8lyFxcdW-NXupF4");
  
  URL_API = 'http://localhost:4000/api/incident'
  
  selectedIncident: Incident = {

  Descripcion: '',
  FechaRecibo: '',
  HoraRecibo: '',
  NumReq: '',
  NumInc: '',
  AreaReporte: '',
  Aplicacion: '',
  Tipologia: '',
  Impacto: '',
  EscaladoA: '',
  FechaEscalamiento: '',
  HoraEscalamiento: '',
  EscaladoPor: '',
  RecibidoPor: '',
  Estado: '',
  Resolucion: '',
  FechaCierre: '',
  HoraCierre: ''

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


}
