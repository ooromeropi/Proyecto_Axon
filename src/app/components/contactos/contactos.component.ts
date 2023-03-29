import { Component, OnInit } from '@angular/core';
import { ContactosService } from 'src/app/services/contactos.service'
import { NgForm } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe'




@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  constructor(public contactService: ContactosService,
              public filterPipe: FilterPipe) { }

  ngOnInit(): void {
    this.getDirectorios()
  }

  getDirectorios() {
    this.contactService.getDirectorios().subscribe(
      res => {
        this.contactService.contacto = res;
        
        
      },
      err => console.log(err)
    )
  }



}
