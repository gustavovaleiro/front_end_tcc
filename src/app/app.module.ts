import { BrowserModule } from '@angular/platform-browser';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthInterceptor, AuthInterceptorProvider } from './core/interceptors/auth.interceptor';
import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './pages/login/login.module';
import { BaseComponent } from './pages/base/base/base.component';
import { BaseModule } from './pages/base/base.module';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
     LoginModule,
     BaseModule,
     ReactiveFormsModule,
 
  ],
  providers: [
    AuthInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
