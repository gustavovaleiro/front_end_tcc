import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import {Funcionario, FuncionarioListDTO } from '../model/funcionario.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { PessoaService } from '../../../pessoa/shared/pessoa.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
export class FuncionarioService extends BaseResourceService<Funcionario> {
    constructor(protected http: HttpClient, protected injector: Injector, private pessoaService: PessoaService){
        super(API_CONFIG.baseUrl+"/funcionarios", injector, Funcionario.fromJson, FuncionarioListDTO.fromJson)
    }


    create(resource: Funcionario):Observable<Funcionario>{
        if(resource.comissao > 1){
            resource.comissao/100;
        }

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

    update(resource: Funcionario):Observable<Funcionario>{
        if(resource.pessoa.id != null && resource.pessoa.id > 0  && resource.id == resource.pessoa.id){
           return this.pessoaService.update(resource.pessoa).pipe(
            flatMap(pessoa => {
                    resource.pessoa = pessoa;
                    return super.update(resource)
                }),
                catchError(this.handleError)
            )
        } else {
            return throwError("Não pode alterar a pessoa de um funcionario")
        }
    }




     
    
}