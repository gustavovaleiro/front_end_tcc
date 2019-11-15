import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  CargoFormComponent } from './cargo-form/cargo-form.component';
import { CargoListComponent } from './cargo-list/cargo-list.component';


const routes: Routes = [
  {path: 'new', component: CargoFormComponent},
  {path: ':id/edit', component: CargoFormComponent},
  {path: '', component: CargoListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoRoutingModule { }
