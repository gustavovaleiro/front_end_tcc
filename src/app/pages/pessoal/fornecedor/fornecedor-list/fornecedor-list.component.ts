import { Component } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Fornecedor, FornecedorListDTO } from '../shared/model/fornecedor.model';
import { FornecedorService } from '../shared/service/fornecedor.service';


@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css'],

})
export class FornecedorListComponent extends BaseResourceListComponent<Fornecedor, FornecedorListDTO> {
   
  constructor(private service: FornecedorService) { 
      super(service);
  }
  
}
