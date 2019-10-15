import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarModule, Calendar} from 'primeng/calendar';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { CategoryFormComponent } from './pessoa-form/category-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CategoryFormComponent],
  imports: [
    SharedModule,
    PessoaRoutingModule,

    
    
  ],
  exports: [
     
  ]
})
export class PessoaModule { }
