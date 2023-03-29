import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CanceladaSpn } from '../models/canceladaspn'
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CanceladaSpnService{
 

  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-access-token', localStorage.getItem("token"));


  
  URL_API = 'http://localhost:4000/api/canceladaspn'
  
  selectedIncident: CanceladaSpn = {

  Numero_Portado: '',
  Tipo_Negocio: '',
  Linea_Nativa: '',
  FVC: '',
  Estado_spn: '',
  Estado_Orden: '',
  Motivo_Cancelacion: '',
  Gestion_Canceladas: '',
  UsrCreador: '',
  UsrModifica: '',
  Observacion: ''
  
  }
  canceladaspn : CanceladaSpn[];

  

  constructor(public http: HttpClient){
    
  }

private findlocalStorage() {
  const token = JSON.parse(localStorage.getItem("token"))
  console.log(token)
 }

 getCanceladas(){
  return this.http.get<CanceladaSpn[]>(this.URL_API);
  }

createCanceladaSpn(canceladaspn: CanceladaSpn){
  return this.http.post(this.URL_API,JSON.stringify(canceladaspn), {headers:this.headers})
}

deleteCanceladaSpn(_id: string){
  return this.http.delete(`${this.URL_API}/${_id}`)
}

obtenerCanceladaSpn(_id: string): Observable<any> {
  return this.http.get(this.URL_API + '/' +_id, {headers:this.headers});
}

editCanceladaSpn(_id: string, canceladaspn: CanceladaSpn): Observable<any> {
   return this.http.put(this.URL_API + '/' +_id, canceladaspn, {headers:this.headers});
}


usrMod(_id: string, UsrModifica): Observable<any> {
  return this.http.put(this.URL_API + '/' +_id, {UsrModifica}, {headers:this.headers});
  
}

getNetUser(){
  return localStorage.getItem('username');
}

}
