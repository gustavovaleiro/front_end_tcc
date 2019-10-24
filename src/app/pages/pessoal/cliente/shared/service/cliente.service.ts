import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Cliente } from '../model/cliente.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { PessoaService } from '../../../pessoa/shared/pessoa.service';
@Injectable({
    providedIn: 'root'
  })
export class ClienteService extends BaseResourceService<Cliente> {

    constructor(protected http: HttpClient, protected injector: Injector, private pessoaService: PessoaService){
        super(API_CONFIG.baseUrl+"/clientes", injector, Cliente.fromJson)
    }

    
    
}