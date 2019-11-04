import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { CategoriaItem } from '../model/categoria-item.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
export class CategoriaService extends BaseResourceService<CategoriaItem> {
    constructor(protected http: HttpClient, protected injector: Injector){
        super(API_CONFIG.baseUrl+"/categorias", injector, CategoriaItem.fromJson, CategoriaItem.fromJson)
    }
    getAllByName(nome: string): Observable<any[]>{
        const url = `${this.apiPath}/page?nome=${nome}`;
		return this.http.get(url).pipe(
			map(this.jsonDataToResourcesPage.bind(this)),
			catchError(this.handleError)
		)
	} 
}