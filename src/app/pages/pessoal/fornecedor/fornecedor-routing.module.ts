import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';


const routes: Routes = [
 {path: 'new', component: FornecedorFormComponent},
  {path: ':id/edit', component:  FornecedorFormComponent},
  {path: '', component:  FornecedorListComponent}];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  FornecedorRoutingModule { }
