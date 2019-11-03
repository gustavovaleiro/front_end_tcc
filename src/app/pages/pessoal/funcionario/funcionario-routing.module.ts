import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';


const routes: Routes = [
  {path: 'new', component: FuncionarioFormComponent},
  {path: ':id/edit', component: FuncionarioFormComponent},
  {path: '', component: FuncionarioListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
