import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { PessoaModule } from '../pessoa/pessoa.module';



@NgModule({
  declarations: [FornecedorFormComponent, FornecedorListComponent],
  imports: [
    SharedModule,
    PessoaModule,
    FornecedorRoutingModule,
  
  ]
})
export class FornecedorModule { }
