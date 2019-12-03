import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaItemRoutingModule } from './categoria-item-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaItemListComponent } from './categoria-item-list/categoria-item-list.component';
import { CategoriaItemFormComponent } from './categoria-item-form/categoria-item-form.component';


@NgModule({
  declarations: [CategoriaItemListComponent,  CategoriaItemFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    CategoriaItemRoutingModule
  ]
})
export class CategoriaItemModule { }
