import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PessoaModule } from '../pessoa/pessoa.module';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [FuncionarioFormComponent, FuncionarioListComponent],
  imports: [
    SharedModule,
    PessoaModule,
    FuncionarioRoutingModule,
    IMaskModule,
  ]
})
export class FuncionarioModule { }
