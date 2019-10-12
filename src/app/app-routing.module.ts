import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { BaseComponent } from './pages/base/base/base.component';


const routes: Routes = [
  {path: "login", loadChildren: "./pages/login/login.module#LoginModule"},
  {path: "", redirectTo: '/login', pathMatch: 'full'},

  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
