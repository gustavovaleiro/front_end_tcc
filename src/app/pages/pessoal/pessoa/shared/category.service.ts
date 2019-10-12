import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { Pessoa, PessoaFisica, TipoPessoa, PessoaJuridica } from './model/pessoa.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Pessoa> {
  
  constructor( protected http: HttpClient, protected injector: Injector) {
     super(API_CONFIG.baseUrl+"/pessoas", injector, PessoaFisica.fromJson);
  }
  
  create(resource: Pessoa): Observable<Pessoa>{
      this.updateResourceFromJsonFn(resource.getTipo());
            
      return super.create(resource);
  }

  private updateResourceFromJsonFn(tipo: TipoPessoa) {
    if (tipo == TipoPessoa.PESSOAJURIDICA) {
      console.log("settando pessoa Fisica como juridica");
      super.jsonDataToResourcefn = PessoaJuridica.fromJson;
    }
  }
}
