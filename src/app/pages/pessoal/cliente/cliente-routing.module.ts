import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';


const routes: Routes = [
 {path: 'new', component: ClienteFormComponent},
  {path: ':id/edit', component: ClienteFormComponent},
  {path: '', component: ClienteListComponent}];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
