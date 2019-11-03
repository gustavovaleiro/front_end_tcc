import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseResourceModel } from '../models/base-resource.model';
import { Observable, throwError,of} from 'rxjs';
import{ map, catchError, flatMap}from 'rxjs/operators';
import { Inject, Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {
	protected http: HttpClient
	
	constructor(
		protected apiPath: string,
		protected injector: Injector,
		protected jsonDataToResourcefn: (jsonData: any)=> T,
		protected jsonDataToResourceDTOfn ?: (jsonData: any)=> T
		){
		this.http = injector.get(HttpClient);
	}
	
	
	getAllPage(): Observable<any[]>{
		return this.http.get(this.apiPath+"/page").pipe(
			map(this.jsonDataToResourcesPage.bind(this)),
			catchError(this.handleError)
		)
	}

	getById(id): Observable<T>{
		const url = `${this.apiPath}/${id}`

		return this.http.get(url).pipe(
			map(this.jsonDataToResource.bind(this)),
			catchError(this.handleError)
		)
	}
	create(resource: T): Observable<T>{

		return  this.http.post(this.apiPath, resource,   { observe: 'response' }).pipe(
			map(response =>{
				let location = response.headers.get('Location');
				resource.id = Number.parseInt(location.split(this.apiPath+"/")[1]);
				return resource;
			}),
			catchError(this.handleError)
			)
	}
	update(resource: T): Observable<T>{
		const url = `${this.apiPath}/${resource.id}`
		console.log("put", resource)
		return this.http.put(url, resource).pipe(
			catchError(this.handleError),
			map(()=>resource)
		);
	}
		
	delete(id: number): Observable<any>{
		const url= `${this.apiPath}/${id}`;
		return this.http.delete(url).pipe(
			catchError(this.handleError),
			map(()=>null)
			);
	}


	protected jsonDataToResourcesPage(jsonData: any): T[]{
		console.log(jsonData);
		const resources: T[] =[];
		jsonData.content.forEach(element => {
			resources.push(this.jsonDataToResourceDTOfn(element));
		});
		return resources;
	  }
  
	  protected jsonDataToResource(jsonData: any): T{
		return this.jsonDataToResourcefn(jsonData);
	  }
			
	  protected handleError(error: any[]): Observable<any>{
	  console.log("erro na requisição ->", error);
	  return throwError(error);
	}

}