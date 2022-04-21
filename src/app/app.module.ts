import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UsersService } from './services/users.service'
//import { Page-not-found-component } from './components/';


const appRoutes:Routes=[

  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'incidents', component:IncidentsComponent},
  {path: 'form', component:FormComponent},
  {path: 'signup', component:SignupComponent},
  //{path: '**', component:Page-not-found-component}

  


]

@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    FormComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
