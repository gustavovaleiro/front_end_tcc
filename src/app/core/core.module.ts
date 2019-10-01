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
import { SideNavMenuComponent } from './components/side-nav-menu/side-nav-menu.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SideNavMenuComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule,

   // HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)   
  ],
  exports:[
    HttpClientModule,
    NavbarComponent,
    SideNavMenuComponent
  ],
  providers: [
    AuthInterceptorProvider,
    StorageService
  ]
})
export class CoreModule { }
