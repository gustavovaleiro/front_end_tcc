import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarModule, Calendar} from 'primeng/calendar';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PessoaFormComponent],
  imports: [
    SharedModule,
    PessoaRoutingModule,
  ],
  exports: [
    PessoaFormComponent
  ]
})
export class PessoaModule { }
