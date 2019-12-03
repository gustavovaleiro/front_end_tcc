import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { LocalUser } from '../models/local_user';
import { StorageService } from 'src/app/core/services/storage.service';
import { CredenciasDTO } from '../models/credenciais.dto';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Observable } from 'rxjs';


@Injectable()
export class AuthService{ 
    public jwtHelper: JwtHelperService = new JwtHelperService();
    constructor( public http: HttpClient,
        public storage: StorageService
       ){

    }

    authenticate(creds: CredenciasDTO){
       return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,
        {
            observe: 'response',
            responseType: 'text'
        })    
    }

    sucessfulLogin(authorizationValue: string){
        console.log(authorizationValue)
        let tok = authorizationValue.substring(7);
        this.getPermissoes().subscribe( response => {
            let user : LocalUser = {
                token: tok,
                usuario: this.jwtHelper.decodeToken(tok).sub,
                permissoes: response,
        
            }
            console.log(user);
            this.storage.setLocalUser(user);
            
        });
       
    }

    public getPermissoes(): Observable<Array<String>>{
        return this.http.get<Array<String>>(`${API_CONFIG.baseUrl}/usuarios/authorities`);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}