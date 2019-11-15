import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { PessoaService } from '../../../pessoa/shared/pessoa.service';
import { Cargo } from '../model/cargo.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
export class CargoService extends BaseResourceService<Cargo> {
    constructor(protected http: HttpClient, protected injector: Injector){
        super(API_CONFIG.baseUrl+"/cargos", injector, Cargo.fromJson, Cargo.fromJson)
    }

    getAllByName(nome: string): Observable<any[]>{
        const url = `${this.apiPath}/page?nome=${nome}`;
		return this.http.get(url).pipe(
			map(this.jsonDataToResourcesPage.bind(this)),
			catchError(this.handleError)
		)
	} 
}

