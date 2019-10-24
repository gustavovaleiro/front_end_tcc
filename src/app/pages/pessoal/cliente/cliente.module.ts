import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PessoaModule } from '../pessoa/pessoa.module';


@NgModule({
  declarations: [ClienteFormComponent],
  imports: [
    SharedModule,
    PessoaModule,
    ClienteRoutingModule,
    
  ]
})
export class ClienteModule { }
