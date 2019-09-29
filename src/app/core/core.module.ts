import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StorageService } from './services/storage.service';
import {  AuthInterceptorProvider } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule,

   // HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)   
  ],
  exports:[
    HttpClientModule,
    NavbarComponent,
  ],
  providers: [
    AuthInterceptorProvider,
    StorageService
  ]
})
export class CoreModule { }
