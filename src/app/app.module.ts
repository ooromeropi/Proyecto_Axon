import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatSliderModule } from '@angular/material/slider';
import { AuthGuard } from './guards/auth.guard'
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';




import { AppComponent } from './app.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { CanceladaSpnComponent } from './components/canceladaSpn/canceladaSpn.component';
import { formCanSpnComponent } from './components/formCanSpn/formCanSpn.component';
import { FormComponent } from './components/form/form.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ExporterService } from './services/exporter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ContactosComponent } from './components/contactos/contactos.component';
import { JmeterComponent } from './components/jmeter/jmeter.component'





@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    CanceladaSpnComponent,
    FormComponent,
    formCanSpnComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    PageNotFoundComponent,
    FilterPipe,
    ContactosComponent,
    JmeterComponent
    
    

    
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule

  ],
  providers: [AuthGuard,ExporterService,FilterPipe, DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { 

  




}


