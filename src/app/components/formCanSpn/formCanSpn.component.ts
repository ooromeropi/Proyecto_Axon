import { Component, OnInit } from '@angular/core';
import { CanceladaSpnService } from 'src/app/services/canceladaspn.service';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormControl, NgForm, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'




@Component({
  selector: 'app-formCanSpn',
  templateUrl: './formCanSpn.component.html',
  styleUrls: ['./formCanSpn.component.css']
})
export class formCanSpnComponent implements OnInit {

  titulo = 'Registro Gestion'
  _id: string | null;
  valfeccp: string | null;
  valTipo: string | null;
  userfullname: any;




  CancelSpnForm = new FormGroup({
    Numero_Portado: new FormControl('', [Validators.required]),
    Tipo_Negocio: new FormControl(''),
    Linea_Nativa: new FormControl(''),
    FVC: new FormControl(''),
    Estado_spn: new FormControl(''),
    Estado_Orden: new FormControl(''),
    Motivo_Cancelacion: new FormControl(''),
    Gestion_Canceladas: new FormControl(''),
    UsrCreador: new FormControl(this.canceladaSpnService.getNetUser()),
    UsrModifica: new FormControl(''),
    Observacion: new FormControl('')
    


  });
  variableDeDatos: any;
  date: Date;

  constructor(public canceladaSpnService: CanceladaSpnService,
    private aRouter: ActivatedRoute,
    private router: Router,
    public userService: UsersService,
    public datepipe: DatePipe) {


    this._id = this.aRouter.snapshot.paramMap.get('_id');
    //const fecIni = new Date(this.IncidentsForm.value.FechaCierre);
    //const fecFin = new Date(this.IncidentsForm.value.FechaCp);
       
    //this.getIncidents();
  }




  ngOnInit(): void {
    this.isEdit();
    const token = sessionStorage.getItem('token');
    this.getUserName()




  }

  getCanceladas() {
    this.canceladaSpnService.getCanceladas().subscribe(
      res => {
        this.canceladaSpnService.canceladaspn = res;
      },
      err => console.log(err)
    )
  }


  getUserName() {
    this.userService.getUserName().subscribe(
      res => {
        this.userService.userForm = res;


      },
      err => console.log(err)
    )
  }


  

  //validacion si el incidente es nuevo o existente
  addCancelaSpn(CancelSpnForm) {
    
    if (CancelSpnForm.valid == true) {
      // si el incidente ya existe se carga la informacion de la base de datos y se realizan validacion adicionales
      
      if (this._id !== null) {
        
        this.canceladaSpnService.editCanceladaSpn(this._id, CancelSpnForm.value).subscribe(data => {
          const usrExcl = (this.canceladaSpnService.getNetUser())


                   
          this.canceladaSpnService.usrMod(this._id, usrExcl).subscribe(data => {
          })
          this.getCanceladas();
          

          this.router.navigate(['/canceladaSpn']);
          this.getCanceladas();
          
        },

        

          err => {
            alert(err.error.message);
            this.CancelSpnForm.reset();
          }
             

        )
      } else {
        this.canceladaSpnService.createCanceladaSpn(CancelSpnForm.value).subscribe(
          res => {
            this.getCanceladas();
            console.log('Formulario valido:', this.CancelSpnForm.valid);
            CancelSpnForm.reset();



            this.router.navigate(['/canceladaSpn']);

          },
          err => alert(err.error.message)

        )
      }
    } else {
      alert("campo obligatorio")
    }
  }



  isEdit() {
    if (this._id !== null) {
      this.titulo = 'Editar Registro';
      this.canceladaSpnService.obtenerCanceladaSpn(this._id).subscribe(data => {
        this.CancelSpnForm.setValue({
            Numero_Portado: data.Numero_Portado,
            Tipo_Negocio: data.Tipo_Negocio,
            Linea_Nativa: data.Linea_Nativa,
            FVC: data.FVC,
            Estado_spn: data.Estado_spn,
            Estado_Orden: data.Estado_Orden,
            Motivo_Cancelacion: data.Motivo_Cancelacion,
            Gestion_Canceladas: data.Gestion_Canceladas,
            UsrCreador: data.UsrCreador,
            UsrModifica: data.UsrModifica,
            Observacion: data.Observacion
        })
      })
    }
  }



}


