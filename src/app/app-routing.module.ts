import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesModule } from './pages/categories/categories.module';  
import { BaseComponent } from './pages/base/base/base.component';


const routes: Routes = [
  {path: "login", loadChildren: "./pages/login/login.module#LoginModule"},
  {path: "", redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: BaseComponent},
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
