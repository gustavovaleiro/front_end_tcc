import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { Pessoa, PessoaFisica, TipoPessoa, PessoaJuridica } from './model/pessoa.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseResourceService<Pessoa> {
  
  constructor( protected injector: Injector) {
     super(API_CONFIG.baseUrl+"/pessoas", injector, Pessoa.fromJson);
  }

  getByDocument(valor: string): Observable<Pessoa>{
    const url = `${this.apiPath}/findBy?document=${valor}`;
    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.catchErrorByDocument)
      )
  }

  catchErrorByDocument(error: any[]): Observable<any>{
    return throwError(error)
  }


}
