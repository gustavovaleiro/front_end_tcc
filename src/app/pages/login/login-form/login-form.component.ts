import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from "@angular/forms"


import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { CredenciasDTO } from '../shared/models/credenciais.dto';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {


 private cred: CredenciasDTO;
 resourceForm: FormGroup;
 constructor(public formBuilder: FormBuilder, 
             public router: Router,
             public auth: AuthService){

            

 }
 ngOnInit(){
   this.buildResourceForm();
 }
  
  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
     
      login: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  login (){
    this.cred = this.getCredFromForm();
    this.auth.authenticate(this.cred).subscribe(response=> {
       this.auth.sucessfulLogin(response.headers.get('Authorization'))
       this.router.navigate(['dash']);
    }, error => console.log(error))

   
  }

  private getCredFromForm(){
    return Object.assign(new CredenciasDTO, this.resourceForm.value);
  }
}
