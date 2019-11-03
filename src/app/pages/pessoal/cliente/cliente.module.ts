import { NgModule } from '@angular/core';
import {IMaskModule} from "angular-imask"
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PessoaModule } from '../pessoa/pessoa.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';


@NgModule({
  declarations: [ClienteFormComponent, ClienteListComponent],
  imports: [
    SharedModule,
    PessoaModule,
    ClienteRoutingModule,
    IMaskModule,
    
  ]
})
export class ClienteModule { }
