import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaItemListComponent } from './categoria-item-list/categoria-item-list.component';
import { CategoriaItemFormComponent } from './categoria-item-form/categoria-item-form.component';


const routes: Routes = [
  {path: '', component: CategoriaItemListComponent},
  {path: ':id/edit', component: CategoriaItemFormComponent},
  {path: 'new', component: CategoriaItemFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaItemRoutingModule { }
