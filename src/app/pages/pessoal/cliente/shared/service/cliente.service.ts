import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Cliente, ClienteListDTO } from '../model/cliente.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { PessoaService } from '../../../pessoa/shared/pessoa.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
export class ClienteService extends BaseResourceService<Cliente> {
    constructor(protected http: HttpClient, protected injector: Injector, private pessoaService: PessoaService){
        super(API_CONFIG.baseUrl+"/clientes", injector, Cliente.fromJson, ClienteListDTO.fromJson)
    }
 

    create(resource: Cliente):Observable<Cliente>{
        if(resource.pessoa.id != null && resource.pessoa.id > 0){
           return this.pessoaService.update(resource.pessoa).pipe(
                flatMap(pessoa => {
                    resource.pessoa = pessoa;
                    return super.create(resource);
                }),
                catchError(this.handleError)
            )
        } else {  
            return this.pessoaService.create(resource.pessoa).pipe(
                flatMap(pessoa => {
                    resource.pessoa = pessoa;
                    return   super.create(resource)
                }),
                catchError(this.handleError)
            )
        }
    }

    update(resource: Cliente):Observable<Cliente>{
        if(resource.pessoa.id != null && resource.pessoa.id > 0  && resource.id == resource.pessoa.id){
           return this.pessoaService.update(resource.pessoa).pipe(
            flatMap(pessoa => {
                    resource.pessoa = pessoa;
                    return super.update(resource)
                }),
                catchError(this.handleError)
            )
        } else {
            return throwError("Não pode alterar a pessoa de um cliente")
        }
    }




     
    
}