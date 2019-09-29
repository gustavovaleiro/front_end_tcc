import { HTTP_INTERCEPTORS, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(public sotrage:StorageService){ 
    }
    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        console.log("Interceptando requisao http para adicionar token");
        let localUser = this.sotrage.getLocalUser();
        if(localUser){
            const authReq = req.clone({headers: req.headers.set('Authorization', "Bearer " + localUser.token)})
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}



export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor  ,
    multi: true,
};