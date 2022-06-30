import { NgModule, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard'
import { Routes, RouterModule  } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { FormComponent } from './components/form/form.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const appRoutes:Routes=[

  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  
  {path: 'home', component:HomeComponent,canActivate: [AuthGuard]},
  {path: 'signin', component:SigninComponent},
  {path: 'incidents', component:IncidentsComponent,canActivate: [AuthGuard]},
  {path: 'form', component:FormComponent,canActivate: [AuthGuard]},
  {path: 'form/:_id', component:FormComponent,canActivate: [AuthGuard]},
  {path: 'signup', component:SignupComponent,canActivate: [AuthGuard]},
  {path: '**', component:PageNotFoundComponent}

]

@NgModule({
   imports: [RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
