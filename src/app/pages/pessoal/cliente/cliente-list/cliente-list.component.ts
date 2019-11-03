import { Component } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ClienteService } from '../shared/service/cliente.service';
import { Cliente, ClienteListDTO } from '../shared/model/cliente.model';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],

})
export class ClienteListComponent extends BaseResourceListComponent<Cliente, ClienteListDTO> {
   
  constructor(private clienteService: ClienteService) { 
      super(clienteService);
  }
  
}
