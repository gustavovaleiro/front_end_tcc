import { Component, OnInit } from '@angular/core';
import { PessoaComplementar } from '../pessoal-complementar-form/pessoal-complementar';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent extends PessoaComplementar implements OnInit {

  constructor() { 
    super()
  }

  ngOnInit() {
    super.ngOnInit()
  }
  static groupElement(principal: boolean, formBuilder: FormBuilder){
    return formBuilder.group({ 
      id: [null],
      principal: [principal, [Validators.required]],
      email: [null, [Validators.required, Validators.minLength(8), Validators.email]],
      tipo: [null],
   })
  }
  protected createElement(principal: boolean): FormGroup{
    let group = EmailFormComponent.groupElement(principal, this.formBuilder);
  
    return group;
  }
}
 