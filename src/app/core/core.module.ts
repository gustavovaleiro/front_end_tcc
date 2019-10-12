import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StorageService } from './services/storage.service';
import {  AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { SideNavMenuComponent } from './components/side-nav-menu/side-nav-menu.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NavTreeComponent } from './components/side-nav-menu/nav-tree/nav-tree.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SideNavMenuComponent,
    NavTreeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
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
